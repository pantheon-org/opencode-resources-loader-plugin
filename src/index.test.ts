/**
 * Simple test script to verify resource-loader plugin functionality
 */

import { ResourceLoaderPlugin } from './index.ts';
import type { PluginInput } from '@opencode-ai/plugin';
import { join } from 'path';

// Mock context for testing
// import.meta.dir is .opencode/plugin, we need to go up to project root
const mockContext = {
  directory: join(import.meta.dir, '..', '..'),
  client: {
    session: {
      prompt: async ({
        path,
        body,
      }: {
        path: { id: string };
        body: { noReply: boolean; parts: Array<{ type: string; text: string }> };
      }) => {
        console.log(`📨 Silent message sent to session ${path.id}:`);
        console.log(`   noReply: ${body.noReply}`);
        console.log(`   text: ${body.parts[0]?.text?.substring(0, 100)}...`);
        return { success: true };
      },
    },
  },
  $: null, // Shell not needed for this test
};

console.log('🧪 Testing Resource Loader Plugin\n');
console.log(`📂 Base directory: ${mockContext.directory}`);
console.log(`📂 Expected .opencode path: ${join(mockContext.directory, '.opencode')}\n`);

try {
  console.log('🔍 Initializing plugin and discovering resources...\n');
  const plugin = await ResourceLoaderPlugin(mockContext as unknown as PluginInput);

  const tools = plugin.tool || {};
  const toolNames = Object.keys(tools);

  console.log(`\n✅ Plugin loaded successfully!`);
  console.log(`📊 Discovered ${toolNames.length} tools:\n`);

  // Group tools by type
  const grouped: Record<string, string[]> = {
    agent: [],
    checklist: [],
    command: [],
    knowledge_base: [],
    task: [],
    template: [],
    discovery: [],
  };

  for (const name of toolNames) {
    if (name.startsWith('agent_')) grouped.agent.push(name);
    else if (name.startsWith('checklist_')) grouped.checklist.push(name);
    else if (name.startsWith('command_')) grouped.command.push(name);
    else if (name.startsWith('knowledge_base_')) grouped.knowledge_base.push(name);
    else if (name.startsWith('task_')) grouped.task.push(name);
    else if (name.startsWith('template_')) grouped.template.push(name);
    else if (name.startsWith('resource_')) grouped.discovery.push(name);
  }

  // Print by type
  for (const [type, names] of Object.entries(grouped)) {
    if (names.length > 0) {
      console.log(`\n📁 ${type}:`);
      names.forEach((name) => console.log(`   - ${name}`));
    }
  }

  // Test discovery tools
  console.log(`\n\n🧪 Testing Discovery Tools\n`);

  const mockToolContext = {
    sessionID: 'test-session-123',
    messageID: 'test-message-456',
    agent: 'test-agent',
    abort: new AbortController().signal,
  };

  // Test resource_list
  if (tools.resource_list) {
    console.log(`\n📋 Testing resource_list (all resources)...`);
    try {
      const resultStr = await tools.resource_list.execute(
        { type: 'all', limit: 5 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} resources (showing first 5)`);
      if (result.resources && result.resources.length > 0) {
        console.log(`   First resource: ${result.resources[0].toolName}`);
      }
    } catch (error) {
      console.error(`❌ resource_list failed:`, error);
    }

    // Test filtering by type
    console.log(`\n📋 Testing resource_list (filter by type: agent)...`);
    try {
      const resultStr = await tools.resource_list.execute(
        { type: 'agent', limit: 10 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} agent resources`);
    } catch (error) {
      console.error(`❌ resource_list type filter failed:`, error);
    }

    // Test filtering by category
    console.log(`\n📋 Testing resource_list (filter by category)...`);
    try {
      const resultStr = await tools.resource_list.execute(
        { category: 'Documentation', limit: 10 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} resources in Documentation category`);
    } catch (error) {
      console.error(`❌ resource_list category filter failed:`, error);
    }

    // Test filtering by tag
    console.log(`\n📋 Testing resource_list (filter by tag)...`);
    try {
      const resultStr = await tools.resource_list.execute(
        { tag: 'documentation', limit: 10 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} resources with tag 'documentation'`);
    } catch (error) {
      console.error(`❌ resource_list tag filter failed:`, error);
    }
  }

  // Test resource_search
  if (tools.resource_search) {
    console.log(`\n🔍 Testing resource_search (query: "documentation")...`);
    try {
      const resultStr = await tools.resource_search.execute(
        { query: 'documentation', max_results: 3 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} matching resources`);
      if (result.results && result.results.length > 0) {
        console.log(
          `   Top match: ${result.results[0].toolName} (score: ${result.results[0].score})`,
        );
      }
    } catch (error) {
      console.error(`❌ resource_search failed:`, error);
    }

    // Test empty query
    console.log(`\n🔍 Testing resource_search (empty query)...`);
    try {
      const resultStr = await tools.resource_search.execute({ query: '' }, mockToolContext);
      const result = JSON.parse(resultStr);
      if (result.error) {
        console.log(`✅ Correctly handled empty query: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Empty query test failed:`, error);
    }

    // Test special characters
    console.log(`\n🔍 Testing resource_search (special characters: "api-docs")...`);
    try {
      const resultStr = await tools.resource_search.execute(
        { query: 'api-docs', max_results: 3 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Found ${result.count} matching resources`);
    } catch (error) {
      console.error(`❌ Special character test failed:`, error);
    }

    // Test no results scenario
    console.log(`\n🔍 Testing resource_search (no results: "xyzabc123456")...`);
    try {
      const resultStr = await tools.resource_search.execute(
        { query: 'xyzabc123456', max_results: 3 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      if (result.message && result.message.includes('No resources found')) {
        console.log(`✅ Correctly handled no results: ${result.message}`);
      }
    } catch (error) {
      console.error(`❌ No results test failed:`, error);
    }

    // Test cache hit (run same query twice)
    console.log(`\n🔍 Testing resource_search cache (same query twice)...`);
    try {
      const query = 'cache-test-documentation';
      await tools.resource_search.execute({ query, max_results: 3 }, mockToolContext);
      const resultStr = await tools.resource_search.execute(
        { query, max_results: 3 },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Cache working, found ${result.count || 0} resources`);
    } catch (error) {
      console.error(`❌ Cache test failed:`, error);
    }
  }

  // Test resource_info
  if (tools.resource_info && toolNames.length > 0) {
    const testToolName = toolNames.find((name) => !name.startsWith('resource_')) || toolNames[0];
    console.log(`\n📄 Testing resource_info (${testToolName})...`);
    try {
      const resultStr = await tools.resource_info.execute(
        { tool_name: testToolName },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      console.log(`✅ Retrieved resource info:`);
      console.log(`   Name: ${result.name}`);
      console.log(`   Type: ${result.type}`);
      console.log(`   Size: ${result.size} characters`);
      if (result.metadata?.category) {
        console.log(`   Category: ${result.metadata.category}`);
      }
    } catch (error) {
      console.error(`❌ resource_info failed:`, error);
    }

    // Test non-existent resource
    console.log(`\n📄 Testing resource_info (non-existent)...`);
    try {
      const resultStr = await tools.resource_info.execute(
        { tool_name: 'nonexistent_resource_xyz' },
        mockToolContext,
      );
      const result = JSON.parse(resultStr);
      if (result.error) {
        console.log(`✅ Correctly handled non-existent resource: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Non-existent resource test failed:`, error);
    }
  }

  // Test executing one regular resource tool if available
  const regularTools = toolNames.filter((name) => !name.startsWith('resource_'));
  if (regularTools.length > 0) {
    console.log(`\n\n🧪 Testing Resource Loading: ${regularTools[0]}\n`);

    const testTool = tools[regularTools[0]];

    try {
      const result = await testTool.execute({}, mockToolContext);
      console.log(`✅ Tool executed successfully!`);
      console.log(`📤 Result: ${result}\n`);
    } catch (error) {
      console.error(`❌ Tool execution failed:`, error);
    }
  } else {
    console.log(
      `\n⚠️  No resource tools discovered. Check that markdown files exist in .opencode/ subdirectories.`,
    );
  }
} catch (error) {
  console.error('❌ Plugin initialization failed:', error);
  process.exit(1);
}
