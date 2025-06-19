class TError extends Error{
    TextLarge: string;
    text: string;

    constructor(TextLarge:string,text:string){
        super();
        this.TextLarge = TextLarge;
        this.text = text;
    }

    static withCode = (code:number)=>{
        return new TError("Ops, algo deu errado",`Erro ${code}`)
    }

    static ConnectionError = ()=>new TError(
        'Não foi possível se conectar com o servidor',
        'Verifique sua conexão com a internet.'
    )

    static Default = ()=>new TError(
        'Ops, algo deu errado',
        'tente novamente mais tarde'
    )
    
}

export {TError}