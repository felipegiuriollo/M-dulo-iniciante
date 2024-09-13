import { select } from '@inquirer/prompts';

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
                console.log('Vamos cadastrar')
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

