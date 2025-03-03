import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      /**
       * As the value of contextType, we'll pass the filepath to our 
       * context.ts file, relative to the ./src/types.ts file. Our 
       * context.ts file is located in the same src folder, so our 
       * path is "./context". Finally, to point to the type we defined 
       * in the file, we can tack on #DataSourceContext to the end of 
       * the file path.
       */
      config: {
        contextType:"./context#DataSourceContext"
      }
    }, // This will create a new file called types.ts in our server's src folder.
  },
};

export default config;