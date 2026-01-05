# Item Upload V2 Prototype

A React prototype for an improved item listing upload tool - a long form interface.

## Project Structure

```
src/
  ├── components/     # Design system components (to be built one by one)
  ├── pages/          # Page-level components
  ├── App.tsx         # Main app component
  ├── main.tsx        # Entry point
  └── index.css       # Global styles
```

## Getting Started

### Install Dependencies
```bash
yarn install
```

### Run Development Server
```bash
yarn dev
```

### Build for Production
```bash
yarn build
```

### Preview Production Build
```bash
yarn preview
```

## Development Notes

This project is set up for building a mini design system. Components will be created one by one in the `src/components/` directory. The main form will be built in `src/pages/` or directly in `App.tsx` as needed.

## MCP Server Configuration

This project uses [Context7](https://github.com/upstash/context7) as an MCP (Model Context Protocol) server to provide up-to-date, version-specific code documentation and examples directly to Cursor's AI assistant. Context7 eliminates outdated or hallucinated API references by fetching documentation straight from the source.

### Getting Started

1. **Get an API Key (Recommended)**: While optional, an API key provides higher rate limits. Get a free API key at [context7.com/dashboard](https://context7.com/dashboard).

2. **Configure in Cursor**: Add the Context7 MCP server configuration to your Cursor settings. You can configure it either:
   - **Globally**: Edit `~/.cursor/mcp.json` in your home directory
   - **Per Project**: Create `.cursor/mcp.json` in this project's root directory

### Configuration Options

#### Option 1: Remote Server Connection

Uses the hosted MCP server. Add this to your `mcp.json` file:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "ctx7sk-aea4c0c0-c3d6-486d-ba8b-acda95c32490"
      }
    }
  }
}
```

#### Option 2: Local Server Connection

Runs the MCP server locally using npx. Add this to your `mcp.json` file:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

Replace `YOUR_API_KEY` with your actual API key from [context7.com/dashboard](https://context7.com/dashboard).

### Usage

Once configured, you can use Context7 in your prompts by adding `use context7` to your request:

```
Create a Next.js middleware that checks for a valid JWT in cookies
and redirects unauthenticated users to /login. use context7
```

You can also set up auto-invoke rules in Cursor Settings > Rules to automatically use Context7 for code-related questions without explicitly mentioning it.

### Resources

- [Context7 GitHub Repository](https://github.com/upstash/context7)
- [Context7 Website](https://context7.com)
- [Get API Key](https://context7.com/dashboard)
