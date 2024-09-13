import { select, input, checkbox } from '@inquirer/prompts';


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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as SETAS para mudar a meta / ESPAÇO para marcar/desmarcar / ENTER para finalizar",
        choices: [...metas],
        instructions: false
    })
    
    if(respostas.length == 0){
        console.log('Nenhuma meta selecionada!')
        return
    }

    metas.forEach((m)=> {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    console.log('Metas concluidas!')
}


const start = async () => {
    while(true){
        // o Await, sempre combinado com o async na função, significa que temos que esperar um retorno do usuário, nesse caso ele selecionar uma opção, se não a máquina vai ficar processando todas as linhas de código abaixo
        const opcao = await select ({
            message: "Menu:",
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
                    await listarMetas()
                break

                case 'Sair':
                    console.log('Até a próxima!')
                    return
        }
    }
}

start()

