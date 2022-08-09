interface ICatFact {
    fact: string,
    length: number
}

class ApiClient {
    static async getCatFact(): Promise<ICatFact> {
        const url = "https://catfact.ninja/fact";
        const httpOptions: RequestInit  = {
            method: 'GET', // default get
            // body: JSON.stringify(OBJECT)
        }
        const result = await fetch(url, httpOptions);
        switch(result.status) {
            case 200: 
                return result.json();
            case 400: 
                throw 'bad request to backend'
            case 404: 
                throw 'Not found'
            case 500: 
                throw 'Server crashed from my input - backend fault'
            default:
                throw result;
        }
    }
}

export default ApiClient;