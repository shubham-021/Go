export interface NavItem {
    title: string;
    slug: string;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: "Bubble Tea",
        items: [
            { title: "Introduction", slug: "bubbletea/introduction" },
            { title: "The Model", slug: "bubbletea/the-model" },
            { title: "Messages & Commands", slug: "bubbletea/messages-and-commands" },
            { title: "The Update Loop", slug: "bubbletea/the-update-loop" },
            { title: "The View", slug: "bubbletea/the-view" },
            { title: "Example App", slug: "bubbletea/example-app" },
        ],
    },
    {
        title: "Go",
        items: [
            { title: "Getting Started", slug: "go/getting-started" },
            { title: "Variables & Constants", slug: "go/variables-and-constants" },
            { title: "Data Types & Pointers", slug: "go/data-types-and-pointers" },
            { title: "Arrays & Slices", slug: "go/arrays-and-slices" },
            { title: "Maps & Structs", slug: "go/maps-and-structs" },
            { title: "Loops & Conditionals", slug: "go/loops-and-conditionals" },
            { title: "Methods & Receivers", slug: "go/methods-and-receivers" },
            { title: "Interfaces", slug: "go/interfaces" },
            { title: "Type Switching", slug: "go/type-switching" },
            { title: "Type System", slug: "go/type-system" },
            { title: "Packages & Scope", slug: "go/packages-and-scope" },
            { title: "Concurrency", slug: "go/concurrency" },
            { title: "Go Idioms", slug: "go/go-idioms" },
        ],
    },
    {
        title: "Rust",
        items: [
            { title: "Getting Started", slug: "rust/getting-started" },
            { title: "Variables & Mutability", slug: "rust/variables-and-mutability" },
            { title: "Data Types", slug: "rust/data-types" },
            { title: "Ownership", slug: "rust/ownership" },
            { title: "References & Borrowing", slug: "rust/references-and-borrowing" },
            { title: "Copy & Clone", slug: "rust/copy-and-clone" },
            { title: "Structs", slug: "rust/structs" },
            { title: "Enums & Pattern Matching", slug: "rust/enums-and-pattern-matching" },
            { title: "Option Type", slug: "rust/option-type" },
            { title: "Error Handling", slug: "rust/error-handling" },
            { title: "Collections", slug: "rust/collections" },
            { title: "Traits", slug: "rust/traits" },
            { title: "Generics", slug: "rust/generics" },
            { title: "Lifetimes", slug: "rust/lifetimes" },
            { title: "Macros", slug: "rust/macros" },
        ],
    },
    {
        title: "TypeScript",
        items: [
            { title: "Getting Started", slug: "typescript/getting-started" },
            { title: "Basic Types", slug: "typescript/basic-types" },
            { title: "Arrays & Tuples", slug: "typescript/arrays-and-tuples" },
            { title: "Enums", slug: "typescript/enums" },
            { title: "Functions & Modules", slug: "typescript/functions-and-modules" },
            { title: "Interfaces", slug: "typescript/interfaces" },
            { title: "Types vs Interfaces", slug: "typescript/types-vs-interfaces" },
            { title: "Union & Intersection Types", slug: "typescript/union-and-intersection-types" },
            { title: "Type Guards", slug: "typescript/type-guards" },
            { title: "Classes", slug: "typescript/classes" },
            { title: "Generics", slug: "typescript/generics" },
            { title: "Utility Types", slug: "typescript/utility-types" },
            { title: "Advanced Types", slug: "typescript/advanced-types" },
            { title: "Records & Maps", slug: "typescript/records-and-maps" },
            { title: "Zod & Validation", slug: "typescript/zod-and-validation" },
        ],
    },
    {
        title: "DevOps",
        items: [
            { title: "Git & GitHub", slug: "devops/git" },
            { title: "Docker", slug: "devops/docker" },
            { title: "CI/CD Pipelines", slug: "devops/ci-cd" },
        ],
    },
    {
        title: "DSA with C++",
        items: [
            { title: "Getting Started", slug: "dsa-cpp/getting-started" },
            { title: "STL Containers", slug: "dsa-cpp/stl-containers" },
            { title: "Associative Containers", slug: "dsa-cpp/stl-associative" },
            { title: "STL Algorithms", slug: "dsa-cpp/stl-algorithms" },
            { title: "Sorting Algorithms", slug: "dsa-cpp/sorting-algorithms" },
            { title: "Classic Algorithms", slug: "dsa-cpp/classic-algorithms" },
            { title: "Problem Solving", slug: "dsa-cpp/problem-solving" },
        ],
    },
    {
        title: "Monorepo",
        items: [
            { title: "Getting Started", slug: "monorepo/getting-started" },
            { title: "Turborepo", slug: "monorepo/turborepo" },
        ],
    },
    {
        title: "React",
        items: [
            { title: "How React Works", slug: "react/how-react-works" },
            { title: "Props & Event Handlers", slug: "react/props-and-events" },
            { title: "State", slug: "react/state" },
            { title: "Side Effects", slug: "react/side-effects" },
            { title: "Hooks", slug: "react/hooks" },
            { title: "Context & State Management", slug: "react/context-and-state" },
            { title: "Routing", slug: "react/routing" },
            { title: "Browser APIs", slug: "react/browser-apis" },
        ],
    },
    {
        title: "Next.js",
        items: [
            { title: "Getting Started", slug: "nextjs/getting-started" },
            { title: "Rendering Strategies", slug: "nextjs/rendering" },
            { title: "Server & Client Components", slug: "nextjs/server-and-client-components" },
            { title: "API Routes", slug: "nextjs/api-routes" },
            { title: "Hydration", slug: "nextjs/hydration" },
            { title: "React Hook Form", slug: "nextjs/react-hook-form" },
            { title: "Server Actions & Forms", slug: "nextjs/server-actions-forms" },
        ],
    },
    {
        title: "Node.js",
        items: [
            { title: "ES Modules", slug: "nodejs/es-modules" },
            { title: "Express Middleware", slug: "nodejs/express-middleware" },
            { title: "Express Server", slug: "nodejs/express-server" },
            { title: "Cookie Authentication", slug: "nodejs/cookie-authentication" },
            { title: "Buffers", slug: "nodejs/buffers" },
            { title: "Streams", slug: "nodejs/streams" },
            { title: "File System", slug: "nodejs/file-system" },
            { title: "Paths", slug: "nodejs/paths" },
        ],
    },
    {
        title: "Random",
        items: [
            { title: "WebSockets", slug: "random/websockets" },
            { title: "WebSockets in Production", slug: "random/websockets-production" },
        ],
    },
    {
        title: "GenAI with Python",
        items: [
            { title: "Transformer Fundamentals", slug: "genai-python/transformer-fundamentals" },
            { title: "Python Environment", slug: "genai-python/python-environment" },
            { title: "Prompting", slug: "genai-python/prompting" },
            { title: "Inference", slug: "genai-python/inference" },
            { title: "Fine-Tuning", slug: "genai-python/fine-tuning" },
            { title: "RAG Fundamentals", slug: "genai-python/rag-fundamentals" },
            { title: "Advanced RAG", slug: "genai-python/rag-advanced" },
            { title: "LangChain", slug: "genai-python/langchain" },
            { title: "LangGraph", slug: "genai-python/langgraph" },
            { title: "Knowledge Graphs & Memory", slug: "genai-python/knowledge-graphs-memory" },
            { title: "Tracing", slug: "genai-python/tracing" },
            { title: "MCP, A2A & Guardrails", slug: "genai-python/mcp-a2a-guardrails" },
        ],
    },
];