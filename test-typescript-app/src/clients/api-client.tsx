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
        let error = new Error();
        switch(result.status) {
            case 200: 
                return result.json();
            case 400: 
                let responseError = {
                    type: 'Error',
                    message: 'bad request to backend',
                    data: '',
                    code: `${result.status}`,
                };
                error = {...error, ...responseError};
                throw error;
            case 404:
                responseError = {
                    type: 'Error',
                    message: 'Not found',
                    data: '',
                    code: `${result.status}`,
                };
                error = {...error, ...responseError};
                throw error;
            case 500:
                responseError = {
                    type: 'Error',
                    message: 'Server crashed from my input - backend fault',
                    data: '',
                    code: `${result.status}`,
                };
                error = {...error, ...responseError};
                throw error;
            default:
                throw result;
        }
    }
}

export default ApiClient;