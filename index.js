import { select, input } from '@inquirer/prompts';

let meta = {
    value: 'Tomar 3L água por dia',
    checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite sua meta: '})
    
    if(meta.length == ''){
       console.log('A meta não pode ser vazia!')
       return
    }

    metas.push({ value: meta, checked: false })

}

const start = async () => {
    while(true){
        // o Await, sempre combinado com o async na função, significa que temos que esperar um retorno do usuário, nesse caso ele selecionar uma opção, se não a máquina vai ficar processando todas as linhas de código abaixo
        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: 'Listar'
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        }) 
        
        switch(opcao){
            case 'Cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break

                case 'Listar':
                console.log('Vamos listar')
                break

                case 'Sair':
                    console.log('Até a próxima!')
                    return
        }
    }
}

start()

