# Gera o relatório em PDF. Uso (da raiz do repositório):
#   python docs/relatorio/scripts/gerar_relatorio.py
# Dependências: docs/relatorio/scripts/requirements.txt
import os

VERSAO = 4
AQUI = os.path.dirname(os.path.abspath(__file__))
RELATORIO = os.path.dirname(AQUI)
PRINTS = os.path.join(RELATORIO, "..", "pesquisa", "brainstorm")

exec(open(os.path.join(AQUI, "parts_head.py"), encoding="utf-8").read())
from reportlab.platypus import Image as RLImage

EQUIPE = ["Arthur Honorio do Carmo", "Joel da Silva de Oliveira", "Luana Magalhães de Souza Alves",
          "Matheus Domingues Sales", "Matheus Sousa de Carvalho", "Thayná Nascimento Albano da Silva"]

s = []

# ---------------- CAPA ----------------
cap_t = ParagraphStyle("ct", fontName="SB", fontSize=34, leading=40, textColor=ROSA, alignment=TA_CENTER)
cap_s = ParagraphStyle("cs", fontName="S", fontSize=13, leading=18, textColor=CINZA, alignment=TA_CENTER)
cap_e = ParagraphStyle("ce", fontName="S", fontSize=11, leading=15, textColor=CINZA, alignment=TA_CENTER)
s += [Spacer(1, 3.2 * cm), P("Agenda Bela", cap_t), Spacer(1, 0.4 * cm),
      P("Agenda, deslocamento e financeiro para profissionais<br/>da beleza que atendem a domicílio", cap_s),
      Spacer(1, 1.1 * cm),
      P("F108 – Desenvolvimento de Projeto Aplicado<br/>Atividade de Extensão – ODS 8: Trabalho Decente e Crescimento Econômico", cap_s),
      Spacer(1, 0.6 * cm),
      P("Universidade de Fortaleza (UNIFOR)<br/>Análise e Desenvolvimento de Sistemas", cap_s),
      Spacer(1, 1.3 * cm),
      P("<b>Equipe – Grupo 31</b>", cap_s),
      P("<br/>".join(EQUIPE), cap_e),
      Spacer(1, 0.5 * cm),
      P("<b>Professor(a):</b> [nome]", cap_s),
      Spacer(1, 1.6 * cm),
      P("Fortaleza – novembro de 2026", cap_s), PageBreak()]

# ---------------- SUMÁRIO ----------------
s += [P("Sumário", h1)]
for i, t in enumerate(["Descrição do Problema", "Planejamento de Requisitos da Solução Geral",
                       "Documentação das Funcionalidades (histórias de usuário)",
                       "Planejamento da Solução MVP", "Métricas para Avaliar o MVP",
                       "Planejamento de Sprints, Monitoramento e Comunicação",
                       "Validação do MVP", "Evidências, Ajuste de Produto e Relatório Final"], 1):
    s.append(P(f"{i}. {t}"))
s.append(P("Anexo A – Regra de cálculo da hora de chamar o transporte<br/>Anexo B – Aviso de privacidade<br/>"
           "Anexo C – Roteiro do teste e questionário<br/>Anexo D – Base teórica (disciplina Gerência de Projetos Ágeis)<br/>"
           "Anexo E – Registro do brainstorming (prints)"))
s.append(Spacer(1, 10))
s.append(FILL("Os trechos destacados em amarelo dependem do grupo (data da entrevista, papéis, prints do protótipo e "
              "do Kanban, resultados dos testes). Substituam-nos pelo conteúdo real e apaguem este aviso antes do envio."))
s.append(NOTA("<b>Como ler este documento:</b> os quadros rosa indicam o conceito da disciplina "
              "<i>Gerência de Projetos Ágeis</i> (percursos ML1 a ML4) aplicado em cada etapa. O Anexo D resume "
              "essa correspondência."))
s.append(PageBreak())

# ---------------- 1 ----------------
s += [P("1. Descrição do Problema", h1), P("1.1 Contexto e relevância para a ODS 8", h2),
      P("Grande parte das profissionais de beleza — manicures, maquiadoras, cabeleireiras, designers de sobrancelha "
        "e esteticistas — trabalha de forma autônoma e, muitas vezes, atende na casa das clientes. Nesse modelo, a "
        "profissional é ao mesmo tempo prestadora do serviço, secretária, responsável pela própria logística e "
        "gestora financeira do negócio."),
      P("A ODS 8 trata da promoção do trabalho decente e do crescimento econômico, incluindo o apoio ao "
        "empreendedorismo, à formalização e ao crescimento de micro e pequenos negócios (meta 8.3) e a busca por "
        "trabalho produtivo e renda digna (meta 8.5). Para a profissional autônoma que atende a domicílio, trabalho "
        "digno passa por organizar a própria agenda, planejar os deslocamentos, não perder clientes e saber quanto "
        "realmente ganha em cada atendimento."),
      P("O <b>Agenda Bela</b> é um site <i>mobile first</i> que une três serviços em um só lugar: "
        "<b>agendamento</b> (data, hora, duração e local), <b>planejamento de deslocamento</b> (rota e hora de chamar "
        "o transporte) e <b>controle financeiro</b> (valor, sinal recebido, custo do deslocamento e lucro). Agenda, "
        "controle financeiro e navegação já existem separados; o diferencial é reuni-los num único fluxo pensado "
        "para quem atende em locais diferentes."),
      P("1.2 Público-alvo (beneficiárias)", h2),
      P("Profissionais autônomas da beleza que <b>se deslocam</b> para atender, em Fortaleza-CE — inclusive as que "
        "também atendem em estúdio próprio, como a profissional entrevistada. Ficam fora do escopo as profissionais "
        "que atendem exclusivamente em local fixo, pois não enfrentam o problema de deslocamento. Embora a pesquisa "
        "tenha partido de uma profissional da beleza, a solução serve a qualquer autônomo que atenda em locais "
        "diferentes. Na plataforma Dream Shape, o público foi registrado nas categorias <i>Micro e pequenos "
        "empreendedores</i>, <i>Mulheres</i> e <i>Outros (profissionais autônomas da beleza que atendem a domicílio)</i>."),
      P("1.3 Entrevista com uma profissional real", h2),
      NOTA("<b>Disciplina (ML3 §1):</b> MVPs não devem ser construídos em isolamento técnico; entrevistas com "
           "usuários-alvo orientam quais funcionalidades são realmente desejadas — e podem mudar o escopo."),
      P("A equipe entrevistou, em duas etapas, uma profissional autônoma que faz unhas, penteados e maquiagem, "
        "atendendo em seu estúdio e em domicílio (identificada como <b>Entrevistada 1</b>). A entrevista foi conduzida "
        "por Joel da Silva de Oliveira, e o registro completo está anexado no Dream Shape."),
      T([["Aspecto", "O que a entrevistada relatou"],
         ["Rotina", "Atende no estúdio e em domicílio; as clientes chegam pelas redes sociais e pelo WhatsApp Business."],
         ["Organização atual", "Agenda física, de papel. Anota nome da cliente, valor já antecipado, dia, horário, local "
          "(se for domicílio) e, conforme a distância, <b>a hora em que precisa começar a pedir o transporte por aplicativo</b>."],
         ["Principal dificuldade (prioridade confirmada)", "O agendamento manual: procurar nas páginas os nomes das clientes "
          "e os horários, folhear a agenda para achar horários livres e atualizar tudo quando uma cliente remarca."],
         ["Deslocamento", "É a parte que mais dá trabalho na rotina. Não tem transporte próprio; já precisou da ajuda de "
          "um familiar para chegar a um atendimento. Atrasos são raros, mas o intervalo entre atendimentos depende "
          "da distância até o próximo local."],
         ["Atendimento a domicílio", "Já tentou atender só no estúdio e perdeu clientes; o domicílio atende quem tem "
          "pouco tempo disponível, por isso ela mantém essa modalidade."],
         ["Sinal", "Trabalha com adiantamento de 30%; quando a cliente cancela e é remarcada, o sinal sobe para 50%."],
         ["Teste", "Aceitou experimentar uma primeira versão da solução."]],
        [4.2 * cm, W - 4.2 * cm]),
      Spacer(1, 4),
      FILL("Informar a data e a duração da entrevista (o registro original ainda não tem esses dados)."),
      P("1.4 Registro do brainstorming", h2),
      P("Em 10 e 11 de novembro de 2026, a partir do registro da entrevista, parte da equipe (Joel da Silva de "
        "Oliveira, Matheus Domingues Sales e Arthur Honorio do Carmo) fez o brainstorming no grupo de WhatsApp, por "
        "áudios transcritos e mensagens. As ideias e as decisões que saíram dele:"),
      T([["Ideia", "Quem propôs", "Decisão no projeto"],
         ["Mostrar o dia como uma linha do tempo, com os atendimentos e os horários vagos entre eles.",
          "Matheus D. Sales", "RF02 – entra no MVP"],
         ["Cada atendimento com início e duração definidos pela profissional.", "Matheus D. Sales", "RF01"],
         ["No cadastro, escolher estúdio ou domicílio; se domicílio, abrir os campos de endereço e de tempo de deslocamento.",
          "Matheus D. Sales", "RF01, RF05, RF06"],
         ["Calcular sozinho a hora de chamar o transporte (atendimento às 14h, 30 min de trajeto → chamar às 13h30) "
          "e avisar a profissional.", "Matheus D. Sales e Joel", "RF07, RF08 – proposta de valor central"],
         ["Registrar os percentuais de sinal (30% e 50%) só como informação, sem cálculo automático.",
          "Matheus D. Sales", "RF09 e RF16"],
         ["Três telas: agendamento (com valor, estimativa e custo de locomoção), agenda (com alerta, editar e "
          "desmarcar) e uma \"carteira\" com ganhos e custos.", "Arthur", "Estrutura do MVP"],
         ["O diferencial é unir agenda, financeiro e deslocamento; incluir o mapa do Google no próprio site.",
          "Arthur", "Proposta de valor; RF05 (mapa incorporado)"],
         ["Não ficar preso à entrevistada: atender qualquer autônomo que trabalhe em locais diferentes.",
          "Arthur", "Definição do público-alvo"]],
        [8.2 * cm, 3.2 * cm, W - 11.4 * cm]),
      Spacer(1, 4),
      P("O brainstorming também registrou uma dúvida importante: se haveria muito a fazer pelo deslocamento além de "
        "passar para o digital o que ela já anota no papel. A equipe decidiu manter a solução simples — o tempo de "
        "trajeto é digitado pela profissional e o sistema calcula e lembra a hora de chamar o transporte —, o que "
        "reproduz um hábito que ela já tem e elimina o cálculo manual. Os prints estão no Anexo E (com os números de "
        "telefone ocultados)."),
      P("1.5 Principais dores identificadas", h2),
      T([["Dor", "Como aparece no dia a dia", "Origem"],
         ["Agenda de papel difícil de consultar", "Folhear páginas para achar uma cliente ou um horário livre.",
          "Entrevista – <b>prioritária</b>"],
         ["Remarcações trabalhosas", "Atualizar a agenda à mão quando a cliente muda o horário.", "Entrevista"],
         ["Planejar o deslocamento", "Calcular o intervalo entre atendimentos e a hora de pedir o transporte por "
          "aplicativo, sem carro próprio.", "Entrevista"],
         ["Controle do sinal", "Lembrar quanto cada cliente já antecipou (30% ou 50%) e quanto falta receber.", "Entrevista"],
         ["Perder clientes ao deixar o domicílio", "Atender só no estúdio afasta clientes com pouco tempo.",
          "Entrevista (justifica o foco no domicílio)"],
         ["Lucro real desconhecido", "O custo do transporte pode reduzir o ganho de cada atendimento sem que ela perceba.",
          "<b>Hipótese da equipe</b> – não citada pela entrevistada; será testada"]],
        [4 * cm, W - 8.2 * cm, 4.2 * cm]),
      Spacer(1, 6),
      P("1.6 Persona", h2),
      P("<b>Camila, 27 anos, manicure, maquiadora e penteadista.</b> Atende no seu pequeno estúdio e na casa das "
        "clientes, recebe os pedidos pelo Instagram e pelo WhatsApp Business e marca tudo numa agenda de papel. Não "
        "tem carro: vai de Uber ou mototáxi e anota ao lado de cada atendimento a hora de pedir a corrida. Cobra 30% de "
        "sinal e perde tempo folheando a agenda sempre que alguém remarca. "
        "<i>(Persona fictícia, construída a partir da entrevista e do brainstorming.)</i>"),
      P("1.7 Cenário atual e desafios de experiência do usuário", h2),
      T([["Dimensão", "Desafio"],
         ["Usabilidade", "A profissional consulta e marca horários entre um atendimento e outro, com pressa. "
          "Encontrar uma cliente ou um horário livre precisa ser mais rápido que folhear o papel."],
         ["Acessibilidade", "Público com níveis variados de familiaridade digital; uso sob sol e em movimento. "
          "Exige alto contraste, textos legíveis e botões grandes."],
         ["Comunicação", "O contato com as clientes acontece pelo WhatsApp Business e redes sociais. A solução deve "
          "conviver com esses canais, não substituí-los."],
         ["Produtividade", "Cada minuto perdido organizando a agenda ou o deslocamento é tempo a menos para atender."]],
        [3.2 * cm, W - 3.2 * cm]),
      PageBreak()]

# ---------------- 2 ----------------
s += [P("2. Planejamento de Requisitos da Solução Geral", h1),
      P("2.1 Objetivos", h2)]
s += B(["Tornar <b>rápido consultar e atualizar a agenda</b>: achar uma cliente, ver horários livres e remarcar.",
        "Indicar <b>a hora de chamar o transporte</b> para cada atendimento a domicílio, com lembrete.",
        "Mostrar o <b>sinal recebido, o restante a receber e o lucro</b> de cada atendimento.",
        "Funcionar direto no navegador do celular, <b>sem instalação obrigatória</b> e sem cadastro."])
s += [P("2.2 Avaliação de tecnologias (matriz de decisão)", h2),
      NOTA("<b>Disciplina (ML2 §2):</b> a escolha de tecnologia é decisão estratégica e deve partir de uma matriz de "
           "decisão com critérios como requisitos, curva de aprendizado, custo, compatibilidade e interoperabilidade "
           "— e, muitas vezes, um único fator é decisivo."),
      T([["Decisão", "Opções avaliadas", "Escolha", "Fator decisivo"],
         ["Plataforma", "App nativo (Android/iOS) × site mobile first", "Site mobile first",
          "Acesso: abre por um link enviado no WhatsApp, sem instalação e sem ocupar espaço no celular; "
          "um único código para Android e iPhone."],
         ["Armazenamento", "Back-end com banco de dados × armazenamento local no navegador", "Local (navegador)",
          "Custo zero e menor escopo no prazo do semestre; também reduz o tratamento de dados pessoais de terceiros."],
         ["Rota e tempo", "API de rotas do Google (Distance Matrix) × mapa incorporado (iframe)", "Mapa incorporado",
          "Gratuito e simples de integrar; a profissional lê o tempo no mapa e digita. O site não lê o valor do iframe "
          "(restrição de segurança do navegador)."],
         ["Lembrete", "Notificação própria (web push/PWA) × evento na agenda do celular", "Agenda do celular",
          "Compatibilidade: web push no iPhone só funciona com o site instalado; o calendário do aparelho "
          "notifica em qualquer celular."],
         ["Protótipo do MVP", "Código funcional × protótipo navegável no Figma", "Código funcional (site)",
          "Validação realista: a participante cadastra no próprio celular, recebe o lembrete de verdade na agenda "
          "do aparelho e vê os cálculos com os dados que digitou; as telas validadas já são o produto "
          "(prototipação evolutiva)."],
         ["Construção do site", "HTML/JavaScript sem framework × React com TypeScript", "React + TypeScript",
          "Interoperabilidade e manutenção: ferramentas gratuitas e amplamente usadas; a tipagem evita erros nos "
          "cálculos de horário e dinheiro, que também são cobertos por testes automatizados."]],
        [2.5 * cm, 4.6 * cm, 2.6 * cm, W - 9.7 * cm]),
      Spacer(1, 4),
      P("A primeira versão deste planejamento escolheu o Figma para o protótipo. Na sprint 2 (19/11), a equipe revisou "
        "a decisão e optou pelo site em código, mantendo o mesmo escopo (itens <i>Must</i>). A revisão segue o "
        "princípio ágil de responder a mudanças: o protótipo funcional mede melhor as hipóteses H3 e H4 (hora do "
        "transporte e lembrete), que dependem de interação real com o celular."),
      Spacer(1, 6),
      P("2.3 Requisitos funcionais (solução completa)", h2),
      T([["ID", "Requisito", "Prioridade"],
         ["RF01", "Cadastrar atendimento com cliente, serviço, data, hora de início, duração e local (estúdio ou "
          "domicílio; se domicílio, endereço).", "Alta"],
         ["RF02", "Exibir o dia como linha do tempo, com atendimentos, deslocamentos e horários livres.", "Alta"],
         ["RF03", "Buscar atendimentos pelo nome da cliente.", "Alta"],
         ["RF04", "Remarcar, editar e cancelar atendimentos.", "Alta"],
         ["RF05", "Exibir rota e tempo estimado até o endereço por mapa incorporado (atendimento a domicílio).", "Alta"],
         ["RF06", "Permitir que a profissional informe o tempo de deslocamento e uma folga.", "Alta"],
         ["RF07", "Calcular a hora de chamar o transporte: início do atendimento − tempo de deslocamento − folga.", "Alta"],
         ["RF08", "Gerar lembrete da hora de chamar o transporte na agenda do celular (Google Agenda / .ics).", "Alta"],
         ["RF09", "Registrar o valor do serviço e o sinal pago, mostrando o restante a receber.", "Alta"],
         ["RF10", "Registrar o meio de deslocamento (aplicativo, ônibus, mototáxi, carro) e o custo.", "Alta"],
         ["RF11", "Calcular o lucro do atendimento (valor − custo de deslocamento).", "Alta"],
         ["RF12", "Exibir a \"carteira\" do dia: valores a receber, sinais recebidos, custos e lucro.", "Alta"],
         ["RF13", "Avisar quando o intervalo entre dois atendimentos for menor que o tempo de deslocamento.", "Média"],
         ["RF14", "Resumo financeiro semanal e mensal.", "Média"],
         ["RF15", "Cadastro de clientes com endereço salvo para reutilizar.", "Média"],
         ["RF16", "Registrar o percentual de sinal combinado (ex.: 30%, ou 50% após cancelamento), sem cálculo automático.", "Média"],
         ["RF17", "Estimar o custo de carro ou moto por km rodado.", "Baixa"],
         ["RF18", "Enviar confirmação à cliente pelo WhatsApp (link pronto).", "Baixa"],
         ["RF19", "Exportar e importar dados (backup em arquivo).", "Baixa"],
         ["RF20", "Apagar todos os dados do aparelho.", "Média"],
         ["RF21", "Notificações próprias via PWA instalado.", "Baixa"],
         ["RF22", "Cálculo automático do tempo de deslocamento via API de rotas.", "Baixa"]],
        [1.4 * cm, W - 3.8 * cm, 2.4 * cm]),
      Spacer(1, 6),
      P("2.4 Requisitos não funcionais", h2),
      T([["ID", "Categoria", "Requisito"],
         ["RNF01", "Plataforma", "Site responsivo, mobile first, otimizado para telas de 360 a 430 px de largura."],
         ["RNF02", "Compatibilidade", "Funcionar nas versões atuais do Chrome (Android) e Safari (iOS)."],
         ["RNF03", "Acesso", "Não exigir instalação nem criação de conta; pode ser instalado como PWA (opcional)."],
         ["RNF04", "Usabilidade", "Cadastrar um atendimento em até 2 minutos; encontrar uma cliente ou um horário "
          "livre em até 3 toques."],
         ["RNF05", "Acessibilidade", "Contraste mínimo WCAG AA, fonte base de 16 px e áreas de toque de pelo menos 44 × 44 px."],
         ["RNF06", "Desempenho", "Carregar a tela inicial em até 3 s em conexão 4G."],
         ["RNF07", "Privacidade", "Privacidade desde a concepção: dados salvos só no aparelho, sem servidor; apenas o "
          "endereço é enviado ao Google Maps para exibir a rota, com aviso à profissional (Anexo B)."],
         ["RNF08", "Segurança", "Servido exclusivamente por HTTPS; chave do mapa restrita ao domínio do site."],
         ["RNF09", "Disponibilidade", "Agenda e carteira consultáveis sem internet; apenas o mapa exige conexão."],
         ["RNF10", "Limitação conhecida", "Dados locais podem ser perdidos ao limpar o navegador ou trocar de aparelho; "
          "no Safari (iOS), sites não instalados podem ter os dados apagados após dias sem uso. Mitigação futura: "
          "backup (RF19) e instalação como PWA."]],
        [1.6 * cm, 3.0 * cm, W - 4.6 * cm]),
      PageBreak()]

# ---------------- 3 ----------------
s += [P("3. Documentação das Funcionalidades (histórias de usuário)", h1),
      NOTA("<b>Disciplina (ML1 §4):</b> no ágil, a documentação não é abandonada, e sim adaptada — útil, direta e "
           "revisada sempre. Os formatos indicados são histórias de usuário, critérios de aceitação, definição de "
           "pronto e notas de release. Por isso cada funcionalidade abaixo está escrita como história de usuário."),
      P("As histórias estão agrupadas nas três telas definidas no brainstorming — agendamento, agenda e carteira — e "
        "na parte de dados. Formato: <i>\"Como [usuária], quero [ação] para [benefício]\"</i>, seguido dos critérios "
        "de aceitação."),
      P("3.1 Agendamento", h2),
      card("HU01 – Novo atendimento", "RF01, RF15",
           "Como profissional autônoma, quero cadastrar um atendimento com cliente, serviço, data, início, duração e "
           "local para parar de depender da agenda de papel.",
           "escolha entre estúdio e domicílio; ao escolher domicílio, aparecem os campos de endereço e tempo de "
           "deslocamento; aviso ao marcar dois atendimentos no mesmo horário."),
      card("HU02 – Deslocamento e hora de chamar o transporte", "RF05, RF06, RF07",
           "Como profissional sem transporte próprio, quero saber a que horas chamar o transporte para chegar a tempo "
           "na casa da cliente, sem fazer a conta de cabeça.",
           "o mapa mostra a rota e o tempo estimado; a profissional digita o tempo e a folga; o sistema mostra "
           "\"Chame o transporte às 13h20 para chegar às 14h00\" (Anexo A)."),
      card("HU03 – Valor, sinal e custo", "RF09, RF10, RF16",
           "Como profissional autônoma, quero registrar o valor do serviço, o sinal que a cliente pagou e quanto vou "
           "gastar para chegar, para saber quanto falta receber.",
           "valor obrigatório; sinal em reais, com o percentual combinado só como informação; meio de deslocamento "
           "em lista; custo zero permitido."),
      P("3.2 Agenda", h2),
      card("HU04 – Linha do tempo do dia", "RF02, RF13",
           "Como profissional autônoma, quero ver meu dia como uma linha do tempo, com atendimentos, deslocamentos e "
           "horários livres, para encaixar clientes sem folhear páginas.",
           "atendimentos em ordem de horário; blocos de deslocamento antes dos atendimentos a domicílio; espaços "
           "vazios destacados como livres; a próxima hora de chamar o transporte aparece no topo."),
      card("HU05 – Buscar cliente", "RF03",
           "Como profissional autônoma, quero buscar uma cliente pelo nome para encontrar o atendimento dela na hora.",
           "a busca mostra resultados enquanto ela digita, com data, horário e local de cada atendimento."),
      card("HU06 – Remarcar ou desmarcar", "RF04",
           "Como profissional autônoma, quero remarcar ou desmarcar um atendimento em poucos toques para manter a "
           "agenda sempre atualizada.",
           "a partir do atendimento, botões \"Remarcar\" e \"Desmarcar\"; ao remarcar, a hora de chamar o transporte "
           "é recalculada; desmarcar exige confirmação."),
      card("HU07 – Lembrete", "RF08",
           "Como profissional autônoma, quero que o celular me avise na hora de chamar o transporte para não depender "
           "da memória.",
           "botão \"Adicionar à minha agenda\" cria um evento no calendário do celular, com alerta na hora calculada e "
           "com cliente, serviço e endereço na descrição."),
      P("3.3 Carteira", h2),
      card("HU08 – Carteira do dia", "RF11, RF12, RF14",
           "Como profissional autônoma, quero ver quanto vou receber, quanto já recebi de sinal, quanto gasto com "
           "deslocamento e quanto lucro no dia, para acompanhar minha renda real.",
           "lucro = valor do serviço − custo de deslocamento; restante a receber = valor − sinal; atendimentos "
           "desmarcados não entram no total; resumos semanal e mensal ficam para versões futuras."),
      P("3.4 Dados e privacidade", h2),
      card("HU09 – Meus dados", "RF19, RF20",
           "Como profissional autônoma, quero saber onde meus dados ficam e poder apagá-los para ter controle sobre "
           "as informações das minhas clientes.",
           "tela com o aviso de privacidade (Anexo B); apagar tudo exige confirmação; nenhum dado vai para servidor "
           "do Agenda Bela."),
      P("3.5 Definição de pronto (Definition of Done) da equipe", h2),
      P("Uma história só vai para a coluna <b>Concluído</b> do quadro quando:")]
s += B(["a tela correspondente está implementada no site e publicada no link de teste;",
        "funciona no celular, no Chrome (Android) e no Safari (iPhone);",
        "as regras de cálculo envolvidas têm testes automatizados passando;",
        "todos os critérios de aceitação foram conferidos por outro integrante (revisão em par);",
        "textos e botões seguem os requisitos de acessibilidade (RNF05);",
        "o card no Trello tem o print da tela anexado."])
s += [FILL("Anexar no Dream Shape as evidências desta seção (prints dos cards no Trello e das telas do site)."),
      PageBreak()]

# ---------------- 4 ----------------
s += [P("4. Planejamento da Solução MVP", h1),
      P("4.1 Objetivo do MVP", h2),
      NOTA("<b>Disciplina (ML3 §1):</b> o MVP busca validar hipóteses com o menor esforço possível. Escopo mínimo não "
           "é produto malfeito: é o núcleo funcional que resolve um problema específico de um público real."),
      P("Validar a hipótese central do projeto: <b>profissionais da beleza que atendem a domicílio conseguem "
        "organizar a agenda com mais facilidade que no papel, sabem a que horas chamar o transporte para cada "
        "atendimento e enxergam quanto vão receber e lucrar — e usariam isso no dia a dia.</b>"),
      P("4.2 Hipóteses a validar (construir → medir → aprender)", h2),
      P("Seguindo o ciclo do Lean Startup, cada hipótese é testada no protótipo (construir), medida por uma métrica "
        "(seção 5) e gera uma decisão de manter, ajustar ou descartar (seção 8)."),
      T([["Hipótese", "Enunciado", "Base", "Métrica"],
         ["H1 – Cadastro", "A profissional cadastra um atendimento (estúdio ou domicílio) sem ajuda.", "Entrevista", "M1, M2"],
         ["H2 – Consulta", "Achar uma cliente e remarcar é mais fácil que na agenda de papel.", "Entrevista (prioridade)", "M3, M6"],
         ["H3 – Transporte", "A hora de chamar o transporte é entendida e útil.", "Entrevista e brainstorming", "M4"],
         ["H4 – Lembrete", "A profissional consegue criar o lembrete no celular sem ajuda.", "Brainstorming", "M5"],
         ["H5 – Carteira", "Ver sinal, restante e lucro ajuda a decidir e organizar a renda.", "Hipótese da equipe", "M7"],
         ["H6 – Adoção", "A profissional usaria o site no trabalho.", "—", "M8, M9"]],
        [2.8 * cm, W - 9 * cm, 4 * cm, 2.2 * cm]),
      Spacer(1, 6),
      P("4.3 Revisão do escopo mínimo", h2),
      P("A equipe revisou o escopo com as três perguntas propostas na disciplina (ML3 §1). A entrevista mudou a ordem "
        "de prioridade da ideia original — que começava pelo deslocamento e pelo lucro — e colocou a consulta à "
        "agenda em primeiro lugar, como no exemplo da apostila em que as entrevistas reduziram o escopo ao que os "
        "usuários realmente precisavam."),
      T([["Pergunta", "Resposta da equipe"],
         ["Qual é a principal dor que estamos resolvendo?",
          "Consultar e atualizar uma agenda de papel, considerando os deslocamentos entre atendimentos."],
         ["Qual funcionalidade é absolutamente necessária para isso?",
          "Cadastro com local, linha do tempo do dia, busca e remarcação, e a hora de chamar o transporte com lembrete. "
          "A carteira entra simplificada, por ser parte da proposta de valor."],
         ["Qual o impacto de deixar o resto para depois?",
          "Baixo: resumos do mês, cadastro de clientes, aviso de conflito de intervalo e backup melhoram a experiência, "
          "mas não são necessários para validar as hipóteses."]],
        [6 * cm, W - 6 * cm]),
      Spacer(1, 6),
      P("4.4 Priorização: matriz MoSCoW", h2),
      T([["Funcionalidade", "Categoria", "Justificativa"],
         ["RF01 Cadastrar atendimento com local", "Must", "Base de tudo; substitui a anotação no papel."],
         ["RF02 Linha do tempo do dia", "Must", "Resolve a dor prioritária: ver horários livres."],
         ["RF03 Buscar cliente", "Must", "Resolve a dor prioritária: achar a cliente sem folhear."],
         ["RF04 Remarcar e desmarcar", "Must", "Remarcação é uma dor confirmada na entrevista."],
         ["RF05–RF07 Mapa, tempo e hora de chamar o transporte", "Must", "Digitaliza o que ela já faz no papel."],
         ["RF08 Lembrete no celular", "Must", "Garante que ela não esqueça de chamar o transporte."],
         ["RF09 Valor e sinal", "Must", "Ela já anota o valor antecipado de cada cliente."],
         ["RF10–RF12 Custo, lucro e carteira do dia", "Must", "Parte da proposta de valor (H5), em versão simples."],
         ["RF13 Aviso de conflito de intervalo", "Should", "Útil, mas o teste não depende disso."],
         ["RF14 Resumos semanal e mensal", "Should", "Agrega valor após o uso contínuo."],
         ["RF15 Cadastro de clientes", "Should", "Agiliza, mas o cadastro avulso basta para validar."],
         ["RF16 Percentual de sinal", "Should", "Depende de detalhar a regra dos 30% e 50% com a profissional."],
         ["RF20 Apagar dados", "Should", "Necessário antes de publicar o site real."],
         ["RF17 Custo por km / RF18 WhatsApp", "Could", "Desejáveis, de baixo impacto no MVP."],
         ["RF19 Backup / RF21 PWA / RF22 API de rotas", "Won't (nesta versão)", "Excluídas de propósito para manter o foco e o prazo."]],
        [6.4 * cm, 2.8 * cm, W - 9.2 * cm]),
      Spacer(1, 6),
      P("4.5 Priorização: matriz Valor × Esforço", h2),
      T([["Funcionalidade", "Valor", "Esforço", "Quadrante"],
         ["Cadastro com local (RF01)", "Alto", "Baixo", "Quick Win"],
         ["Busca por cliente (RF03)", "Alto", "Baixo", "Quick Win"],
         ["Hora de chamar o transporte (RF06/RF07)", "Alto", "Baixo", "Quick Win"],
         ["Valor, sinal e lucro (RF09–RF11)", "Alto", "Baixo", "Quick Win"],
         ["Linha do tempo do dia (RF02)", "Alto", "Médio", "Major Project"],
         ["Remarcar e desmarcar (RF04)", "Alto", "Médio", "Major Project"],
         ["Mapa incorporado (RF05) e lembrete (RF08)", "Alto", "Médio", "Major Project"],
         ["Resumos semanal/mensal (RF14)", "Médio", "Médio", "Fill-in"],
         ["Cálculo automático via API (RF22)", "Médio", "Alto", "Thankless Task (por ora)"],
         ["Notificações próprias PWA (RF21)", "Baixo", "Alto", "Thankless Task"]],
        [6.6 * cm, 2.2 * cm, 2.2 * cm, W - 11 * cm]),
      Spacer(1, 4),
      P("As duas matrizes chegaram à mesma conclusão: os <i>Quick Wins</i> e <i>Major Projects</i> de alto valor são "
        "exatamente os itens <i>Must</i>, que formam o MVP."),
      P("4.6 Escopo formal do MVP", h2),
      T([["Parte", "Conteúdo"],
         ["Objetivo", "Site funcional, em versão mínima, que permita cadastrar e consultar atendimentos, remarcar, saber a hora de "
          "chamar o transporte com lembrete e ver a carteira do dia."],
         ["Entregas", "Três telas principais, como definido no brainstorming: <b>agendamento</b> (cliente, serviço, "
          "início, duração, local, endereço, tempo de deslocamento, valor, sinal e custo do transporte), "
          "<b>agenda</b> (linha do tempo, busca, remarcar, desmarcar e lembrete) e <b>carteira</b> (a receber, "
          "sinais, custos e lucro do dia)."],
         ["Limitações", "Sem servidor: os dados ficam só no navegador do aparelho; tempo de deslocamento digitado "
          "pela profissional; apenas a visão do dia; para os testes, a agenda pode ser carregada com atendimentos "
          "de exemplo (como o da Carla, usado na T2)."],
         ["Exclusões", "Back-end e contas de usuário; cálculo automático de rota; notificações próprias; resumos "
          "semanal/mensal; cadastro de clientes; regra automática de sinal; backup; confirmação via WhatsApp."],
         ["Prazo", "10/11 a 27/11/2026, em 4 sprints (seção 6)."]],
        [2.6 * cm, W - 2.6 * cm]),
      Spacer(1, 4),
      P("As exclusões funcionam como o \"documento de exclusões\" recomendado na disciplina e ficam registradas "
        "também no backlog, para proteger o projeto do <i>scope creep</i> (crescimento descontrolado de requisitos)."),
      P("4.7 Tipo de protótipo", h2),
      NOTA("<b>Disciplina (ML2 §3):</b> o tipo de protótipo deve seguir o objetivo. O funcional/média fidelidade "
           "testa fluxos e usabilidade com usuários reais; o de alta fidelidade aproxima a aparência do produto final."),
      P("O MVP é um <b>protótipo funcional em código</b>, com <b>alta fidelidade visual</b>: um site mobile first "
        "que executa de verdade os fluxos principais (cadastro, linha do tempo, busca, remarcação, hora do "
        "transporte, lembrete e carteira), com os dados salvos no navegador do aparelho. As participantes acessam "
        "por link no próprio celular. O projeto segue a <b>prototipação evolutiva</b>: as telas validadas e as "
        "correções apontadas nos testes evoluem direto para o produto, sem reconstrução."),
      P("4.8 Fluxos principais", h2),
      T([["Fluxo", "Passos"],
         ["Cadastrar atendimento a domicílio", "Agenda → \"+ Novo\" → cliente, serviço, data, início e duração → escolhe "
          "domicílio → endereço (mapa mostra a rota) → digita tempo de deslocamento e folga → meio e custo do "
          "transporte → valor e sinal → resumo com \"Chame o transporte às X\" → \"Adicionar à minha agenda\"."],
         ["Consultar e remarcar", "Agenda → busca pelo nome da cliente → abre o atendimento → \"Remarcar\" → escolhe novo "
          "dia e horário na linha do tempo → hora de chamar o transporte recalculada."],
         ["Ver a carteira", "Agenda → \"Carteira\" → total a receber, sinais recebidos, custos de deslocamento e lucro do dia."]],
        [4.2 * cm, W - 4.2 * cm]),
      Spacer(1, 6),
      P("Exemplo de agenda de um dia, elaborado no brainstorming:"),
      T([["Horário", "O que aparece na agenda"],
         ["09:00 às 10:30", "Cliente A, estúdio"],
         ["13:30 às 14:00", "Deslocamento de 30 min (chamar o transporte às 13:30)"],
         ["14:00 às 16:00", "Cliente B, domicílio, endereço registrado"],
         ["16:40 às 17:00", "Deslocamento de 20 min (chamar o transporte às 16:40)"]],
        [3.6 * cm, W - 3.6 * cm]),
      Spacer(1, 6),
      FILL("Inserir prints das telas do site e o link publicado."),
      P("4.9 Disponibilização", h2),
      P("Por ser um site estático sem back-end, ele é publicado com custo zero no <b>GitHub Pages</b>, com HTTPS "
        "(RNF08). A cada mudança no repositório, os testes automatizados rodam e, se passarem, o site é publicado "
        "de novo; se um teste falhar, a versão anterior continua no ar. Caso o mapa incorporado exija chave, ela "
        "fica fora do código e é restrita ao domínio do site, evitando uso indevido."),
      PageBreak()]

# ---------------- 5 ----------------
s += [P("5. Métricas para Avaliar o MVP", h1),
      P("5.1 Métricas de vaidade × métricas de valor (acionáveis)", h2),
      P("<b>Métricas de vaidade</b> impressionam, mas não mostram se o produto resolve o problema — por exemplo, "
        "número de acessos ao link, curtidas na divulgação ou quantas pessoas abriram o protótipo. <b>Métricas de "
        "valor (acionáveis)</b> estão ligadas à transformação que o produto gera para a profissional: se o resultado "
        "ficar abaixo da meta, a equipe sabe exatamente o que mudar."),
      P("Também evitamos confundir métricas com <b>indicadores de progresso</b>, como a porcentagem de telas "
        "prototipadas. Esse indicador é útil para a gestão interna (seção 6.6), mas não diz nada sobre o impacto da "
        "solução."),
      P("5.2 Critérios de uma boa métrica", h2),
      P("Todas as métricas abaixo foram checadas pelos cinco critérios da disciplina (ML4 §1): são "
        "<b>específicas</b>, <b>mensuráveis</b>, <b>relevantes</b>, <b>acionáveis</b> e <b>de fácil obtenção</b> "
        "(observação no teste ou formulário). Elas foram organizadas em três categorias: uso, desempenho e satisfação."),
      P("5.3 Métricas definidas", h2),
      T([["Métrica", "Categoria", "Objetivo / justificativa", "RFs", "Como medir", "Meta"],
         ["M1 – Sucesso ao cadastrar", "Uso", "Verificar se o cadastro é compreensível sem ajuda (H1).", "RF01, RF05–RF10",
          "% que conclui a Tarefa 1 sem ajuda.", "≥ 80%"],
         ["M2 – Tempo para cadastrar", "Desempenho", "Verificar se o cadastro cabe na rotina corrida (RNF04).", "RF01–RF10",
          "Cronômetro na Tarefa 1 (mediana).", "≤ 2 min"],
         ["M3 – Sucesso ao buscar e remarcar", "Uso", "Verificar se a dor prioritária é resolvida (H2).", "RF02–RF04",
          "% que conclui a Tarefa 2 sem ajuda.", "≥ 80%"],
         ["M4 – Compreensão da hora do transporte", "Uso", "Verificar se o cálculo é entendido (H3).", "RF07",
          "% que responde corretamente na Tarefa 4.", "≥ 80%"],
         ["M5 – Sucesso ao criar lembrete", "Uso", "Verificar se o lembrete funciona para o público (H4).", "RF08",
          "% que conclui a Tarefa 3 sem ajuda.", "≥ 70%"],
         ["M6 – Comparação com o papel", "Satisfação", "Verificar se o site é melhor que a agenda atual (H2).", "RF02–RF04",
          "% que marca 4 ou 5 em \"Achar uma cliente e remarcar foi mais fácil do que na minha agenda\".", "≥ 70%"],
         ["M7 – Percepção da carteira", "Satisfação", "Testar a hipótese da equipe sobre o financeiro (H5).", "RF09–RF12",
          "% que marca 4 ou 5 em \"Ver o sinal e o lucro me ajuda a organizar minha renda\".", "≥ 70%"],
         ["M8 – Nota de usabilidade (SUS)", "Satisfação", "Medir a usabilidade geral com questionário padronizado.",
          "Todas", "Questionário SUS (0 a 100).", "≥ 68"],
         ["M9 – Intenção de uso", "Satisfação", "Estimar a adoção real (H6).", "Todas",
          "% que marca 4 ou 5 em \"Eu usaria o Agenda Bela no meu trabalho\".", "≥ 70%"]],
        [2.6 * cm, 2.6 * cm, 3.1 * cm, 1.9 * cm, 3.3 * cm, W - 13.5 * cm]),
      Spacer(1, 6),
      P("5.4 Coleta, frequência e decisão", h2),
      P("Dados <b>quantitativos</b> (sucesso, tempo, notas) e <b>qualitativos</b> (comentários, dificuldades "
        "observadas, respostas abertas) são coletados juntos, porque os números mostram <i>onde</i> há problema e os "
        "comentários mostram <i>por quê</i>. M1 a M5 vêm da observação das tarefas; M6 a M9 vêm do questionário logo "
        "após o teste. Os dados são consolidados em planilha ao fim da sprint de validação."),
      T([["Se a métrica ficar abaixo da meta…", "Decisão prevista"],
         ["M1 ou M2", "Simplificar o cadastro (menos campos, separar em etapas, sugerir duração padrão por serviço)."],
         ["M3 ou M6", "Rever a busca e a linha do tempo — é a dor prioritária, então vira o primeiro ajuste."],
         ["M4", "Reescrever o texto da hora de chamar o transporte e mostrar o cálculo de forma visual."],
         ["M5", "Destacar o botão de lembrete ou oferecer cópia do horário para a profissional criar o alarme."],
         ["M7", "Simplificar a carteira ou rebaixar sua prioridade, já que o financeiro era uma hipótese da equipe."],
         ["M8 ou M9", "Analisar as respostas abertas para identificar a principal barreira de adoção."]],
        [5.5 * cm, W - 5.5 * cm]),
      Spacer(1, 4),
      P("Seguindo a disciplina, a documentação registra as métricas escolhidas, os critérios de medição, os "
        "resultados e, principalmente, as decisões tomadas a partir deles (seção 8)."),
      PageBreak()]

# ---------------- 6 ----------------
s += [P("6. Planejamento de Sprints, Monitoramento e Comunicação", h1),
      P("6.1 Escolha da metodologia", h2),
      NOTA("<b>Disciplina (ML1 §2 e ML3 §2):</b> a metodologia deve ser escolhida pelo contexto — incerteza do escopo, "
           "prazo, maturidade da equipe e regulação do ambiente —, e não por preferência ou modismo."),
      T([["Critério", "Contexto do Agenda Bela", "Indica"],
         ["Incerteza do escopo", "Ideia nova; a entrevista já mudou as prioridades uma vez.", "Ágil"],
         ["Prazo", "Pouco mais de duas semanas, com entrega fixa em 27/11.", "Ciclos curtos e incrementais"],
         ["Maturidade da equipe", "Equipe acadêmica de 6 pessoas, com experiências diferentes.", "Papéis claros e estrutura simples"],
         ["Regulação", "Ambiente não regulado.", "Não exige modelo preditivo"]],
        [3.6 * cm, W - 7.6 * cm, 4 * cm]),
      Spacer(1, 4),
      P("<b>Escolha: Scrum com quadro Kanban, orientado pelo ciclo Lean Startup.</b> O Scrum dá cadência (sprints "
        "curtas, papéis e cerimônias); o Kanban dá visibilidade do fluxo de tarefas a toda a equipe; e o Lean Startup "
        "orienta o objetivo do MVP — construir o mínimo, medir com usuárias reais e aprender."),
      P("6.2 Equipe e papéis", h2),
      T([["Integrante", "Papel", "Responsabilidade"],
         ["Arthur Honorio do Carmo", "Product Owner", "Decide o que entra ou não no backlog; guarda a visão do produto e as exclusões."],
         ["Joel da Silva de Oliveira", "Time – Pesquisa", "Conduziu a entrevista; recrutamento das participantes e condução dos testes."],
         ["Matheus Domingues Sales", "Time – UX/UI", "Desenho das telas e da experiência de uso do site."],
         ["Luana Magalhães de Souza Alves", "[definir]", "[definir]"],
         ["Matheus Sousa de Carvalho", "[definir]", "[definir]"],
         ["Thayná Nascimento Albano da Silva", "[definir]", "[definir]"]],
        [5 * cm, 3.2 * cm, W - 8.2 * cm]),
      Spacer(1, 4),
      FILL("Confirmar os papéis e distribuir os que faltam: Desenvolvimento do site, Scrum Master (quadro, cerimônias e prazos), "
           "Dados e documentação (planilha de métricas, gráficos e relatório) e Apoio aos testes (coleta de evidências). "
           "Os três integrantes ainda sem papel podem assumir essas funções a partir da sprint 2."),
      P("6.3 Cerimônias adaptadas ao prazo", h2)]
s += B(["<b>Planning</b> (início de cada sprint, ~20 min por videochamada): escolher os cards do Backlog.",
        "<b>Daily assíncrona</b> (grupo de WhatsApp): cada integrante responde o que fez, o que vai fazer e se há impedimento.",
        "<b>Review</b> (fim de cada sprint): demonstração do que ficou pronto (telas, roteiro, resultados).",
        "<b>Retrospectiva</b> (fim de cada sprint): o que funcionou, o que mudar — alimenta as lições aprendidas (seção 8.7)."])
s += [P("6.4 Ferramentas e quadro Kanban", h2)]
s += B(["<b>Trello</b> – quadro Kanban com as colunas <i>Backlog → A fazer → Fazendo → Em teste → Concluído</i>, "
        "mais a coluna <i>Impedimentos</i>; cada card é uma história (HU) ou tarefa.",
        "<b>GitHub</b> – repositório do código, histórico de versões e publicação do site (GitHub Pages).",
        "<b>React + TypeScript</b> (com Vite) – construção do site; <b>Vitest</b> – testes automatizados das "
        "regras de cálculo (hora do transporte, restante a receber e lucro).",
        "<b>WhatsApp</b> – comunicação diária e brainstorming (áudios transcritos); <b>Google Meet</b> – planning, "
        "review e retrospectiva.",
        "<b>Google Forms</b> – questionário; <b>Google Sheets</b> – métricas e gráficos; <b>Google Drive</b> – evidências."])
s += [P("6.5 Planejamento das sprints", h2),
      T([["Sprint", "Período", "Objetivo", "Entregas"],
         ["1 – Descoberta", "10/11 a 18/11", "Entender o problema e definir requisitos.",
          "Entrevista em duas etapas, brainstorming, dores, persona, RF/RNF, quadro Kanban montado."],
         ["2 – MVP e protótipo", "19/11 a 21/11", "Recortar o MVP e prototipar.",
          "Histórias de usuário, MoSCoW, Valor × Esforço, métricas, site do MVP publicado, roteiro e formulário."],
         ["3 – Validação", "22/11 a 25/11", "Testar com usuárias reais.",
          "Mínimo de 10 testes, prints/fotos, respostas do formulário."],
         ["4 – Análise e relatório", "26/11 a 27/11", "Consolidar resultados e entregar.",
          "Gráficos, parecer, ajustes, lições aprendidas e envio no Dream Shape."]],
        [3.2 * cm, 2.5 * cm, 4.3 * cm, W - 10 * cm]),
      Spacer(1, 4),
      FILL("Inserir um print do quadro Kanban ao fim de cada sprint (4 prints) com a data visível."),
      P("6.6 Monitoramento e controle", h2),
      NOTA("<b>Disciplina (ML1 §1):</b> monitorar é coletar, medir e divulgar o desempenho; controlar é analisar e "
           "decidir para manter o projeto no rumo — protegendo escopo, tempo, custo e qualidade."),
      P("Indicadores do projeto acompanhados na review de cada sprint:"),
      T([["Indicador", "Como medir", "Sinal de alerta"],
         ["Taxa de conclusão do planejado", "Cards concluídos ÷ cards planejados na sprint", "Abaixo de 80%"],
         ["Cards parados", "Cards em \"Fazendo\" ou \"Em teste\" há mais de 2 dias", "Qualquer card parado"],
         ["Testes realizados", "Testes concluídos ÷ meta de 10 (sprint 3)", "Menos de 5 até 24/11"]],
        [4.5 * cm, W - 8 * cm, 3.5 * cm]),
      Spacer(1, 4),
      P("<b>Controle de mudanças:</b> qualquer pedido de nova funcionalidade durante o projeto passa por análise de "
        "impacto no prazo, decisão do Product Owner e registro no backlog. Se não couber no prazo, entra como "
        "<i>Won't</i> desta versão. A mudança de prioridades trazida pela entrevista (seção 4.3) foi a primeira "
        "aplicação desse controle."),
      P("6.7 Matriz de riscos", h2),
      T([["Risco", "Probab.", "Impacto", "Resposta planejada"],
         ["Não conseguir 10 participantes", "Alta", "Alto",
          "Teste remoto pelo Forms; cada integrante recruta ao menos 2 pessoas; pedir indicações à entrevistada, que "
          "também aceitou testar."],
         ["Atraso no site", "Média", "Alto",
          "Priorizar só as telas dos fluxos principais; telas Should ficam de fora."],
         ["Site não funcionar bem em algum celular", "Média", "Médio",
          "Testar o link no Android e no iPhone antes dos testes (teste de compatibilidade)."],
         ["Erro de cálculo ou perda de dados durante um teste", "Baixa", "Alto",
          "Regras de cálculo cobertas por testes automatizados, que rodam antes de cada publicação; atendimentos "
          "de exemplo que podem ser recarregados a qualquer momento."],
         ["Indisponibilidade de integrantes", "Média", "Médio",
          "Daily assíncrona; tarefas com responsável e substituto no card; equipe de 6 permite redistribuir."],
         ["Participantes sem autorização de imagem", "Baixa", "Médio",
          "Usar prints de tela e respostas anonimizadas como evidência."]],
        [3.8 * cm, 2.0 * cm, 2.0 * cm, W - 7.8 * cm]),
      Spacer(1, 4),
      P("6.8 Acordo de equipe e resolução de conflitos", h2)]
s += B(["Prazos internos e responsáveis registrados em cada card; avisar no grupo se algo vai atrasar.",
        "Decisões de produto ficam com o Product Owner; divergências técnicas são resolvidas por <b>colaboração</b> "
        "(buscar uma solução que atenda os dois lados), com o Scrum Master como mediador se necessário. Exemplo: a "
        "dúvida sobre o que fazer pelo deslocamento (seção 1.4) foi resolvida com uma solução simples que atende à "
        "proposta de valor e ao prazo.",
        "Feedback entre integrantes no formato DESC: descrever o fato, expressar o efeito, sugerir e dizer as consequências.",
        "A retrospectiva é o espaço para levantar problemas de organização antes que virem conflito."])
s += [PageBreak()]

# ---------------- 7 ----------------
s += [P("7. Validação do MVP", h1),
      NOTA("<b>Disciplina (ML2 §4 e ML4 §4):</b> testar protótipos antecipa problemas antes que fiquem caros. "
           "Entrega técnica não é validação: é preciso confrontar o produto com usuários reais e evidências."),
      P("7.1 Tipos de teste aplicados", h2),
      T([["Teste", "O que verifica no Agenda Bela"],
         ["Usabilidade", "Se a profissional completa as tarefas sem ajuda e quais elementos confundem."],
         ["Fluxo", "Se as sequências cadastro → deslocamento → valor → lembrete e busca → remarcação são lógicas."],
         ["Compatibilidade", "Se o protótipo abre e funciona no Chrome (Android) e no Safari (iPhone); o questionário registra o aparelho usado por cada participante."],
         ["Aceitação", "Se a solução atende às expectativas das profissionais (comparação com o papel e intenção de uso)."]],
        [3.2 * cm, W - 3.2 * cm]),
      Spacer(1, 6),
      P("7.2 Plano de validação", h2),
      T([["Item", "Definição"],
         ["Objetivo", "Validar as hipóteses H1 a H6 e medir as métricas M1 a M9."],
         ["Método", "Teste de usabilidade com protótipo navegável, seguido de questionário. Duas modalidades: "
          "<b>moderado</b> (presencial ou por videochamada, com cronômetro) e <b>remoto</b> (link do protótipo + "
          "Google Forms enviado pelo WhatsApp, com respostas autodeclaradas)."],
         ["Ferramentas", "Site do Agenda Bela aberto no celular da participante; cronômetro; Google Forms; Google Sheets."],
         ["Usuárias", "Profissionais autônomas da beleza que atendem a domicílio (manicures, maquiadoras, "
          "cabeleireiras, designers de sobrancelha, esteticistas), começando pela Entrevistada 1."],
         ["Universo", "Mínimo de 10 participantes; meta de 12 para compensar desistências."],
         ["Recrutamento", "Rede de contatos dos 6 integrantes, indicações da profissional entrevistada, grupos de "
          "WhatsApp e perfis profissionais no Instagram de Fortaleza."],
         ["Duração", "10 a 20 minutos por participante."],
         ["Ética", "Participação voluntária, termo de consentimento simples no início do formulário, respostas "
          "anonimizadas (Participante 1, 2…) e fotos só com autorização."]],
        [3.2 * cm, W - 3.2 * cm]),
      Spacer(1, 4),
      P("Na modalidade remota, o tempo da Tarefa 1 (M2) e o sucesso das tarefas são autodeclarados no formulário; a "
        "equipe informa no relatório quantos testes foram feitos em cada modalidade."),
      P("7.3 Tarefas do teste", h2),
      T([["Tarefa", "Enunciado para a participante", "Métricas"],
         ["T1", "\"Cadastre um atendimento: cliente Ana, unhas, amanhã às 14h, com 1h30 de duração, na casa dela "
          "(endereço X). O serviço custa R$ 50 e ela já pagou R$ 20 de sinal. Você vai de Uber, leva 30 minutos e "
          "gasta R$ 15.\"", "M1, M2"],
         ["T2", "\"A cliente Carla pediu para mudar o horário dela para sexta às 10h. Encontre o atendimento e remarque.\"", "M3"],
         ["T3", "\"Faça o celular te avisar na hora de chamar o transporte para a Ana.\"", "M5"],
         ["T4", "\"A que horas você precisa chamar o transporte para a Ana? Quanto ainda falta ela pagar e quanto você "
          "vai lucrar?\"", "M4, M7"]],
        [1.6 * cm, W - 4.2 * cm, 2.6 * cm]),
      Spacer(1, 6),
      P("7.4 Relação entre ações e métricas", h2),
      T([["Ação no teste", "O que se observa", "Métrica"],
         ["Cadastro do atendimento", "Concluiu sozinha? Quanto tempo levou? Onde travou?", "M1, M2"],
         ["Busca e remarcação", "Achou a cliente? Conseguiu remarcar?", "M3"],
         ["Adição do lembrete", "Encontrou o botão e concluiu?", "M5"],
         ["Leitura da hora do transporte e da carteira", "Respondeu corretamente horário, restante e lucro?", "M4, M7"],
         ["Questionário pós-teste", "Comparação com o papel, carteira, SUS e intenção de uso", "M6–M9"]],
        [4.6 * cm, W - 6.6 * cm, 2 * cm]),
      Spacer(1, 6),
      P("7.5 Registro da execução", h2),
      P("Tabela a ser preenchida durante os testes (S = sucesso sem ajuda, A = com ajuda, N = não concluiu; "
        "Modo = moderado ou remoto). Seguindo a disciplina, documentam-se também os cenários testados, as falhas "
        "encontradas e as melhorias propostas."),
      T([["Nº", "Perfil (serviço)", "Data", "Modo", "T1", "Min.", "T2", "T3", "T4", "SUS", "Observações"]] +
        [[str(i), "", "", "", "", "", "", "", "", "", ""] for i in range(1, 13)],
        [1.0 * cm, 2.4 * cm, 1.5 * cm, 1.4 * cm, 0.9 * cm, 1.4 * cm, 0.9 * cm, 0.9 * cm, 0.9 * cm, 1.2 * cm,
         W - 12.5 * cm]),
      PageBreak()]

# ---------------- 8 ----------------
s += [P("8. Evidências, Ajuste de Produto e Relatório Final", h1),
      P("8.1 Evidências", h2),
      P("Lista de evidências a anexar no Dream Shape (o critério de avaliação exige no mínimo 5):")]
s += B(["Registro da entrevista com a Entrevistada 1 (já produzido).",
        "Prints do brainstorming no WhatsApp, com os telefones ocultados (Anexo E).",
        "Prints do quadro Kanban ao fim de cada uma das 4 sprints.",
        "Prints das telas do site e o link publicado.",
        "Histórico de versões do repositório no GitHub (commits e publicações).",
        "Fotos ou prints de pelo menos 10 testes (com autorização das participantes).",
        "Respostas do Google Forms (resumo exportado) e planilha de consolidação das métricas."])
s += [FILL("Inserir aqui as fotos e prints dos testes, com legenda (o que é, data, participante anonimizada)."),
      P("8.2 Resultados das métricas", h2),
      T([["Métrica", "Categoria", "Meta", "Resultado", "Atingiu?"],
         ["M1 – Sucesso ao cadastrar", "Uso", "≥ 80%", "", ""],
         ["M2 – Tempo para cadastrar", "Desempenho", "≤ 2 min", "", ""],
         ["M3 – Sucesso ao buscar e remarcar", "Uso", "≥ 80%", "", ""],
         ["M4 – Compreensão da hora do transporte", "Uso", "≥ 80%", "", ""],
         ["M5 – Sucesso ao criar lembrete", "Uso", "≥ 70%", "", ""],
         ["M6 – Comparação com o papel", "Satisfação", "≥ 70%", "", ""],
         ["M7 – Percepção da carteira", "Satisfação", "≥ 70%", "", ""],
         ["M8 – Nota SUS", "Satisfação", "≥ 68", "", ""],
         ["M9 – Intenção de uso", "Satisfação", "≥ 70%", "", ""]],
        [5.8 * cm, 2.8 * cm, 2 * cm, 3 * cm, W - 13.6 * cm]),
      Spacer(1, 4),
      FILL("Inserir gráficos: barras com a taxa de sucesso por tarefa (M1, M3, M4, M5), tempo por participante (M2), "
           "distribuição das notas SUS (M8) e respostas de escala (M6, M7, M9). Incluir os principais comentários "
           "qualitativos que explicam os números."),
      P("8.3 Parecer da equipe sobre o MVP (validação)", h2),
      P("A validação responde às perguntas-chave da disciplina: <b>o produto funciona como esperado? Para quem? "
        "Resolve de fato o problema proposto?</b>"),
      T([["Hipótese", "Validada?", "Evidência (métrica e comentários)"],
         ["H1 – Cadastro", "", ""], ["H2 – Consulta", "", ""], ["H3 – Transporte", "", ""],
         ["H4 – Lembrete", "", ""], ["H5 – Carteira", "", ""], ["H6 – Adoção", "", ""]],
        [3.6 * cm, 2.4 * cm, W - 6 * cm]),
      Spacer(1, 4),
      P("8.4 Ajuste de produto", h2),
      NOTA("<b>Disciplina (ML4 §3):</b> o ajuste (refinamento do MVP) prioriza as mudanças pela frequência do problema "
           "× impacto percebido, separa ajustes rápidos de mudanças estruturais e documenta o quê, por quê, como e "
           "com que resultado. Ajustar também pode ser remover funcionalidades."),
      T([["Problema observado", "Frequência (nº de participantes)", "Impacto", "Ajuste proposto", "Tipo"],
         ["", "", "", "", "Rápido / estrutural"], ["", "", "", "", ""], ["", "", "", "", ""]],
        [4 * cm, 2.6 * cm, 1.8 * cm, W - 11 * cm, 2.6 * cm]),
      Spacer(1, 4),
      FILL("Exemplo de preenchimento: \"3 de 10 não acharam o botão de remarcar → colocar o botão direto no card do "
           "atendimento na linha do tempo → ajuste rápido\"."),
      P("8.5 Alterações de funcionalidades (MoSCoW revisada)", h2),
      FILL("Reclassificar as funcionalidades da seção 4.4 com base nos testes. Ex.: \"cadastro de clientes passou de "
           "Should para Must, pedido por 6 participantes\" ou \"carteira desceu para Should, pouco valorizada (M7)\"."),
      P("8.6 Demonstrações de sucesso", h2),
      FILL("Depoimentos curtos das participantes (com autorização) e métricas que atingiram a meta."),
      P("8.7 Documento de lições aprendidas", h2),
      P("Estruturado conforme o modelo da disciplina (ML4, Quadro 3):"),
      T([["Seção", "Conteúdo"],
         ["Introdução", "Experiências da descoberta, prototipação e validação do MVP do Agenda Bela."],
         ["Objetivo", "Registrar o que funcionou, o que não atendeu às expectativas e as ações para as próximas versões."],
         ["Contexto", "O MVP entregou agendamento com local, agenda em linha do tempo com busca e remarcação, hora de "
          "chamar o transporte com lembrete e carteira do dia; resumos, cadastro de clientes e backup ficaram para depois."],
         ["Metodologia de coleta", "Quantitativa (métricas M1–M9, taxa de conclusão das sprints) e qualitativa "
          "(entrevista, comentários dos testes e retrospectivas de cada sprint)."],
         ["Conclusão", "[A PREENCHER] Síntese do que a equipe leva para os próximos projetos."]],
        [3.6 * cm, W - 3.6 * cm]),
      Spacer(1, 6),
      T([["Lição", "Descrição do problema", "Lição aprendida", "Plano de ação"],
         ["1", "A ideia inicial priorizava deslocamento e lucro, mas a entrevista mostrou que a dor principal era "
          "consultar e atualizar a agenda de papel.",
          "Ouvir a usuária antes de fechar o escopo evita construir a parte errada primeiro.",
          "Nos próximos projetos, validar as prioridades com pelo menos uma entrevista antes de definir o MVP."],
         ["2", "", "", ""], ["3", "", "", ""]],
        [1.4 * cm, (W - 1.4 * cm) / 3, (W - 1.4 * cm) / 3, (W - 1.4 * cm) / 3]),
      Spacer(1, 4),
      FILL("Completar nas retrospectivas: o que funcionou bem? O que faríamos diferente? Que erros cometemos e o que "
           "eles ensinaram? Incluir lições técnicas e também de organização (divisão de tarefas, comunicação, prazo, "
           "recrutamento de participantes)."),
      P("8.8 Impacto esperado", h2),
      P("Ao ajudar profissionais autônomas da beleza a organizar a agenda sem papel, planejar o transporte até cada "
        "cliente e acompanhar o sinal e o lucro de cada atendimento, o Agenda Bela contribui para a ODS 8 de três "
        "formas: mais <b>produtividade</b> (menos tempo procurando horários e calculando trajetos), mais <b>renda</b> "
        "(manter o atendimento a domicílio, que segundo a entrevistada evita a perda de clientes, e decidir com base "
        "no lucro real) e mais <b>autonomia e profissionalização</b>, criando base para a formalização como MEI. Por "
        "ser um site gratuito, sem instalação e compartilhável por link, a solução tem baixa barreira de entrada."),
      PageBreak()]

# ---------------- ANEXOS ----------------
s += [P("Anexo A – Regra de cálculo da hora de chamar o transporte", h1),
      P("<b>Hora de chamar o transporte = início do atendimento − tempo de deslocamento − folga</b>"),
      P("Exemplo do brainstorming: atendimento às 14h00 com 30 minutos de deslocamento → chamar o transporte às "
        "13h30. Com uma folga de 10 minutos para o carro chegar, o horário passa para <b>13h20</b>. O lembrete é criado "
        "na agenda do celular para esse horário, com o título \"Chamar transporte – [cliente]\" e o endereço na "
        "descrição. Para quem tem transporte próprio, o mesmo horário vale como hora de sair."),
      P("O tempo de deslocamento é <b>digitado pela profissional</b> a partir da estimativa exibida no mapa "
        "incorporado — reproduzindo o que a entrevistada já faz no papel. Essa decisão elimina a necessidade de "
        "back-end e de API paga no MVP. O cálculo automático fica como evolução futura (RF22)."),
      Spacer(1, 10),
      P("Anexo B – Aviso de privacidade (texto proposto para o site)", h1),
      P("<i>\"Seus dados ficam só no seu celular. O Agenda Bela não tem servidor e não guarda suas informações nem "
        "as das suas clientes. Para mostrar a rota, o endereço do atendimento é enviado ao Google Maps. Se você "
        "limpar os dados do navegador ou trocar de celular, suas informações serão perdidas. Você pode apagar "
        "tudo a qualquer momento em Meus dados.\"</i>"),
      P("Embora o armazenamento seja apenas local, o projeto adota práticas alinhadas à LGPD: transparência sobre "
        "o envio do endereço a terceiros (Google), coleta mínima de dados e controle total da profissional sobre a "
        "exclusão. Nos testes, aplicam-se as boas práticas da disciplina: consentimento, anonimização e "
        "armazenamento seguro das respostas. Pelo mesmo motivo, a entrevistada é identificada apenas como "
        "Entrevistada 1 e os telefones foram ocultados nos prints do brainstorming."),
      Spacer(1, 10),
      P("Anexo C – Roteiro do teste e questionário", h1),
      P("C.1 Roteiro (teste moderado)", h2)]
s += B(["Apresentar-se, explicar o objetivo (\"estamos testando o site, não você\") e pedir autorização para fotos/prints.",
        "Perguntas iniciais: que serviços você faz? Atende em estúdio, a domicílio ou os dois? Como organiza sua "
        "agenda hoje? Como se desloca?",
        "Enviar o link do protótipo e aplicar as tarefas T1 a T4, sem ajudar. Cronometrar a T1 e anotar travamentos.",
        "Pedir que a participante pense em voz alta durante as tarefas.",
        "Aplicar o questionário (Google Forms) e agradecer."])
s += [P("C.2 Teste remoto (Google Forms)", h2),
      P("O formulário abre com o termo de consentimento e o link do protótipo. Para cada tarefa, a participante "
        "responde: <i>Conseguiu concluir?</i> (sim, sozinha / sim, com dificuldade / não) e, na T1, <i>Quanto tempo "
        "levou, mais ou menos?</i>. Na T4, ela escreve o horário, o restante a receber e o lucro que encontrou (a "
        "equipe confere se está correto: chamar o transporte às 13h20, R$ 30 a receber e R$ 35 de lucro). Em seguida vêm as partes do questionário abaixo."),
      P("C.3 Questionário pós-teste", h2),
      P("<b>Parte 1 – Perfil:</b> serviços que realiza; onde atende (estúdio, domicílio ou os dois); atendimentos por "
        "semana; meio de deslocamento mais usado; como organiza a agenda hoje; celular usado no teste (Android ou iPhone)."),
      P("<b>Parte 2 – Utilidade (1 = discordo totalmente, 5 = concordo totalmente):</b>")]
s += B(["Achar uma cliente e remarcar foi mais fácil do que na minha agenda atual. <i>(M6)</i>",
        "Saber a hora de chamar o transporte me ajudaria a não me atrasar.",
        "Ver o sinal e o lucro me ajuda a organizar minha renda. <i>(M7)</i>",
        "Eu usaria o Agenda Bela no meu trabalho. <i>(M9)</i>"])
s += [P("<b>Parte 3 – SUS (System Usability Scale), 1 a 5:</b> <i>(M8)</i>")]
sus = ["Eu acho que gostaria de usar este site com frequência.",
       "Eu achei o site desnecessariamente complexo.",
       "Eu achei o site fácil de usar.",
       "Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o site.",
       "Eu achei que as funções do site estão bem integradas.",
       "Eu achei que o site apresenta muita inconsistência.",
       "Eu imagino que a maioria das pessoas aprenderia a usar este site rapidamente.",
       "Eu achei o site atrapalhado de usar.",
       "Eu me senti confiante ao usar o site.",
       "Eu precisei aprender várias coisas novas antes de conseguir usar o site."]
s += [Paragraph(f"{i}. {q}", bul) for i, q in enumerate(sus, 1)]
s += [P("<b>Cálculo do SUS:</b> itens ímpares → (resposta − 1); itens pares → (5 − resposta). Some os 10 valores "
        "e multiplique por 2,5. O resultado vai de 0 a 100; acima de 68 é considerado acima da média."),
      P("<b>Parte 4 – Aberta:</b> o que você mais gostou? O que mudaria? Que funcionalidade faz falta?"),
      PageBreak(),
      P("Anexo D – Base teórica: disciplina Gerência de Projetos Ágeis", h1),
      P("Correspondência entre os conteúdos da disciplina e as seções deste documento:"),
      T([["Percurso", "Conteúdo", "Onde foi aplicado"],
         ["ML1 §1", "Monitoramento e controle; métricas de projeto; matriz de riscos; controle de mudanças", "6.6, 6.7"],
         ["ML1 §2", "Escolha da metodologia (tradicional, ágil, híbrida) pelo contexto", "6.1"],
         ["ML1 §3", "Resolução de conflitos: estilos (colaborar), mediação, feedback DESC, acordo de equipe", "6.8"],
         ["ML1 §4", "Documentação ágil: histórias de usuário, critérios de aceitação, definição de pronto", "3"],
         ["ML2 §1", "Escopo (objetivo, entregas, limitações, exclusões, prazos); scope creep; MoSCoW", "4.4, 4.6"],
         ["ML2 §2", "Avaliação de tecnologias por matriz de decisão", "2.2"],
         ["ML2 §3", "Tipos de protótipo (funcional, alta fidelidade, evolutivo)", "4.7"],
         ["ML2 §4", "Testes em protótipos (usabilidade, fluxo, compatibilidade, aceitação); documentar testes", "7.1, 7.5"],
         ["ML3 §1", "Revisão do escopo mínimo: entrevistas com usuários, 3 perguntas, valor × esforço, exclusões",
          "1.3, 4.3, 4.5, 4.6"],
         ["ML3 §2", "Scrum, Kanban e Lean Startup; papéis PO, Scrum Master e time", "4.2, 6.1–6.4"],
         ["ML3 §4", "Disponibilização: hospedagem estática, variáveis de ambiente, escuta ativa", "4.9, 7"],
         ["ML4 §1", "Métricas: 5 critérios, vaidade × valor, categorias uso/desempenho/satisfação", "5"],
         ["ML4 §2", "Dados quantitativos e qualitativos; ética (consentimento, anonimização)", "5.4, 7.2, Anexo B"],
         ["ML4 §3", "Ajuste de produto: MoSCoW e Valor × Esforço, frequência × impacto", "4.4, 4.5, 8.4, 8.5"],
         ["ML4 §4", "Validação e documento de lições aprendidas", "8.3, 8.7"]],
        [2 * cm, W - 5.4 * cm, 3.4 * cm]),
      Spacer(1, 8),
      P("<b>Fonte:</b> material didático da disciplina Gerência de Projetos Ágeis, percursos ML1 a ML4 "
        "(UNIFOR, 2025.2)."),
      FILL("Se o professor exigir referências no padrão ABNT, incluir aqui as obras indicadas no material da disciplina."),
      PageBreak(),
      P("Anexo E – Registro do brainstorming (WhatsApp, 10 e 11/11/2026)", h1),
      P("Prints do grupo da equipe em ordem cronológica, com os números de telefone ocultados. Os áudios aparecem com a "
        "transcrição automática do WhatsApp.")]

import glob
pics = sorted(glob.glob(os.path.join(PRINTS, "brainstorm_*.jpg")))
cw = (W - 0.6 * cm) / 4
rows, row = [], []
for p in pics:
    from PIL import Image as PI
    w0, h0 = PI.open(p).size
    row.append(RLImage(p, width=cw - 0.2 * cm, height=(cw - 0.2 * cm) * h0 / w0))
    if len(row) == 4:
        rows.append(row); row = []
if row:
    rows.append(row + [""] * (4 - len(row)))
g = Table(rows, colWidths=[cw] * 4)
g.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 3),
                       ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
s.append(g)

def footer(c, d):
    if d.page == 1: return
    c.saveState()
    c.setFont("S", 8); c.setFillColor(colors.HexColor("#888888"))
    c.drawString(2 * cm, 1.2 * cm, "Agenda Bela – F108 Desenvolvimento de Projeto Aplicado – UNIFOR")
    c.drawRightString(A4[0] - 2 * cm, 1.2 * cm, str(d.page))
    c.setStrokeColor(ROSA); c.setLineWidth(0.6)
    c.line(2 * cm, A4[1] - 1.4 * cm, A4[0] - 2 * cm, A4[1] - 1.4 * cm)
    c.restoreState()

SAIDA = os.environ.get("SAIDA_PDF") or os.path.join(RELATORIO, f"Agenda_Bela_F108_v{VERSAO}.pdf")
doc = SimpleDocTemplate(SAIDA, pagesize=A4, leftMargin=2 * cm, rightMargin=2 * cm,
                        topMargin=2 * cm, bottomMargin=2 * cm, title="Agenda Bela – F108",
                        author="Equipe Agenda Bela – Grupo 31")
doc.build(s, onFirstPage=footer, onLaterPages=footer)
print("ok:", os.path.normpath(SAIDA))
