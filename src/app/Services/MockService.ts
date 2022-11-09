import { createServer, Model } from "miragejs"

export default function MockService() {
  createServer({
    models: {
      reminder: Model,
    },

    routes() {
      this.get("/api/reminders", () => ({
        reminders: [
          { id: 1, text: "Walk the dog" },
          { id: 2, text: "Take out the trash" },
          { id: 3, text: "Work out" },
        ],
      }))

      let newId = 4
      this.post("/api/reminders", async (schema, request) => {
        console.log('1')
        console.log(request)
        console.log(request.requestBody)
        

        const readFile = async (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                console.log(file);
            const reader = new FileReader();
            reader.onerror = () => reject(new Error('There was an error reading the file!'));
            reader.onload = () => resolve(reader.result as string);
            reader.readAsText(file);
            });
        const formData: FormData = request.requestBody as unknown as FormData;
        const uploadFile: File = formData.get('aaa') as File;
        const fileContents: string = await readFile(uploadFile);
        console.log('Uploaded file contents:', fileContents);
        // let attrs = JSON.parse(request.requestBody)
        // attrs.id = newId++

        return {
            reminders: [
              { id: 1, text: "Walk the dog" },
              { id: 2, text: "Take out the trash" },
              { id: 3, text: "Work out" },
            ],
          }
      })
    },
  })
}