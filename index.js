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

    metas.forEach((m)=> {
        m.checked = false
    })
    
    if(respostas.length == 0){
        console.log('Nenhuma meta selecionada!')
        return
    }   

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    console.log('Metas concluidas!')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Não existem metas realizadas! :( ')
        return
    }

    await select ({
        message:  'Metas realizadas',
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        console.log('Não existem metas abertas! :D')
        return
    }

    await select ({
        message:  'Metas abertas = ' + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {
    while(true){
        // o Await, sempre combinado com o async na função, significa que temos que esperar um retorno do usuário, nesse caso ele selecionar uma opção, se não a máquina vai ficar processando todas as linhas de código abaixo
        const opcao = await select ({
            message: "Menu:",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: 'Listar'
                },
                {
                    name: "Metas realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "Abertas"
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

                case 'Realizadas':
                    await metasRealizadas()                    
                break
                
                case 'Abertas':
                    await  metasAbertas()
                break

                case 'Sair':
                    console.log('Até a próxima!')
                    return
        }
    }
}

start()

