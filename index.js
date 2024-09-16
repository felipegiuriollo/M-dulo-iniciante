import { select, input, checkbox } from '@inquirer/prompts';
import {promises as fs} from 'fs'


let mensagem = 'Bem vindo ao APP de metas!'

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile('metas.json', "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


//let meta = {
//    value: 'Tomar 3L água por dia',
//    checked: false
//}



const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite sua meta: '})
    
    if(meta.length == ''){
        mensagem = 'A meta não pode ser vazia'
        return
    }

    metas.push({ value: meta, checked: false })

    mensagem = 'Meta Cadastrada com Sucesso!'

}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }

    const respostas = await checkbox({
        message: "Use as SETAS para mudar a meta / ESPAÇO para marcar/desmarcar / ENTER para finalizar",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m)=> {
        m.checked = false
    })
    
    if(respostas.length == 0){
        mensagem = 'Nenhuma meta selecionada!'
        return
    }   

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
   
    mensagem = 'Meta(s) selecionada(s)'
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Não existem metas realizadas! :('
        return
    }

    await select ({
        message:  'Metas realizadas',
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = 'Não existem metas abertas! :D'
        return
    }

    await select ({
        message:  'Metas abertas = ' + abertas.length,
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }

    const desmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensDeletar = await checkbox({
        message: 'Selecionar item para deletar',
        choices: [...desmarcadas],
        instructions: false
    })

    if(itensDeletar == 0){
        return
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = 'Meta(s) deletada(s) com sucesso!'

}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log("")
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {

    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

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
                    name: "Deletar Metas",
                    value: "Deletar"
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
                break

                case 'Listar':
                    await listarMetas()
                break

                case 'Deletar':
                    await deletarMetas()
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


