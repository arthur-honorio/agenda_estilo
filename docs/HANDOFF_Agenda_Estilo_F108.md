# Handoff: Projeto Agenda Estilo – F108 (UNIFOR)

> Em 19/11/2026 o projeto foi renomeado de **Agenda Bela** para **Agenda Estilo**, para incluir
> barbeiros e esteticistas. Nomes de arquivos e links antigos abaixo foram mantidos como estão.

> Contexto para continuar o trabalho no Claude Code. Conversa original: 17 a 19/11/2026.
> Usuário: Arthur Honorio do Carmo (ADS/UNIFOR). Idioma: português.

## 1. O trabalho

- **Disciplina:** F108 – Desenvolvimento de Projeto Aplicado (UNIFOR), atividade de extensão ligada à **ODS 8** (trabalho decente e crescimento econômico).
- **Base teórica exigida:** disciplina *Gerência de Projetos Ágeis*, percursos ML1 a ML4 (material lido na conversa; o mapeamento está no Anexo D do relatório).
- **Entrega:** PDF + evidências na plataforma **Dream Shape**, **prazo 27/11/2026**.
- **Os 8 itens da proposta:** 1) problema, 2) requisitos gerais, 3) documentação das funcionalidades, 4) MVP, 5) métricas acionáveis × vaidade, 6) sprints/Kanban, 7) validação do MVP (**mínimo 10 usuários reais**), 8) evidências + relatório final com gráficos.
- **Peso da nota:** a validação com usuárias, as evidências e o relatório final somam cerca de 2,5 dos 5 pontos.

## 2. O produto

**Agenda Estilo**: **site mobile first** (não é app nativo) para profissionais autônomas da beleza que **atendem a domicílio**. Une três serviços:
1. **Agendamento**: cliente, serviço, data, início, duração, local (estúdio ou domicílio + endereço).
2. **Deslocamento**: um **iframe do Google Maps** mostra a rota e o tempo; **a profissional digita o tempo** (o site não lê o iframe). O sistema calcula a **hora de chamar o transporte** = início − deslocamento − folga, e gera um **lembrete na agenda do celular** (Google Agenda/.ics).
3. **Carteira**: valor, **sinal pago**, restante a receber, custo do deslocamento, lucro.

**Decisões técnicas:** sem back-end, dados salvos **só no navegador**; protótipo navegável no **Figma** (a proposta não exige código). LGPD: o endereço vai ao Google pelo iframe, por isso existe um aviso de privacidade (Anexo B). Limitação: o Safari pode apagar dados locais de sites não instalados.

## 3. Pesquisa já feita (evidências reais)

- **Entrevista (Entrevistada 1)**, feita pelo Joel em duas etapas, antes de 10/11 (**data e duração ainda não informadas**). Achados:
  - atende no estúdio e a domicílio, com agenda de papel
  - **dor prioritária:** agendamento manual (achar cliente, horários livres, remarcar)
  - não tem transporte próprio, vai de app de transporte e **anota no papel a hora de pedir o transporte**
  - sinal de 30% (50% após cancelamento)
  - já tentou atender só no estúdio e perdeu clientes
  - **aceitou testar**
  - **não falou em lucro**, por isso o financeiro é uma **hipótese da equipe (H5/M7)**
- **Brainstorming no WhatsApp (10–11/11)**, com Joel, Matheus Domingues Sales e Arthur:
  - linha do tempo do dia com horários livres
  - estúdio/domicílio no cadastro
  - hora de chamar o transporte com aviso
  - sinal só como informação
  - 3 telas (agendamento, agenda, carteira)
  - diferencial: unir os três serviços
  - público: qualquer autônomo que atenda em locais diferentes
- **Os 9 prints** foram editados: telefones cobertos, a parte sobre "recesso" cortada do último, ordem cronológica. Ficam em `prints_final/`.
- **Outra participante confirmada:** a esposa de um amigo do Arthur, que trabalha com beleza.

## 4. Equipe – Grupo 31

| Integrante | Papel |
|---|---|
| Arthur Honorio do Carmo | Product Owner |
| Joel da Silva de Oliveira | Pesquisa (fez a entrevista) |
| Matheus Domingues Sales | UX/UI, protótipo (citou um "repositório": confirmar se vão programar em vez de usar o Figma) |
| Luana Magalhães de Souza Alves | [definir] |
| Matheus Sousa de Carvalho | [definir] |
| Thayná Nascimento Albano da Silva | [definir] |

Papéis que faltam distribuir: Scrum Master, Dados/documentação, Apoio aos testes. Luana, Matheus S. e Thayná **não participaram do brainstorming** e não devem ser citados como participantes dele.

## 5. Relatório (PDF v3, 28 páginas): estrutura e conteúdo-chave

Gerado com ReportLab pelo script `gerar3.py`. Seções:
- **1.** Problema, ODS 8, público, entrevista (tabela), brainstorming (tabela ideia → quem → decisão), dores com origem (entrevista × hipótese), persona fictícia "Camila", desafios de UX.
- **2.** Objetivos; **matriz de decisão tecnológica** (ML2); **RF01–RF22**; RNF01–RNF10.
- **3.** **Histórias de usuário HU01–HU09** com critérios de aceitação + Definição de Pronto (ML1).
- **4.** Hipóteses **H1–H6** (Lean Startup), as 3 perguntas de revisão de escopo, **MoSCoW**, **Valor × Esforço**, escopo formal (objetivo/entregas/limitações/exclusões/prazo), tipo de protótipo, fluxos, exemplo de agenda do brainstorming, disponibilização futura.
- **5.** Métricas **M1–M9** (uso/desempenho/satisfação, 5 critérios do ML4), tabela "se ficar abaixo da meta → decisão".
- **6.** Metodologia Scrum + Kanban + Lean (justificada), papéis, cerimônias, ferramentas, sprints, monitoramento, **matriz de riscos**, acordo de equipe/conflitos.
- **7.** Tipos de teste, plano de validação (moderado + remoto), **tarefas T1–T4**, ações × métricas, tabela de registro (12 linhas).
- **8.** Evidências, resultados (vazio), parecer por hipótese, ajuste de produto, MoSCoW revisada, lições aprendidas (lição 1 já preenchida: a entrevista mudou as prioridades), impacto na ODS 8.
- **Anexos:** A (cálculo da hora do transporte), B (aviso de privacidade), C (roteiro + Forms + questionário + SUS), D (mapa ML1–ML4 → seções), E (prints do brainstorming).

**MVP (Must):** RF01–RF12. **Should:** RF13 (conflito de intervalo), RF14 (resumos), RF15 (clientes), RF16 (% de sinal), RF20 (apagar dados). **Could:** RF17, RF18. **Won't:** RF19 (backup), RF21 (PWA), RF22 (API de rotas).

**Dados do cenário de teste (devem bater com o protótipo):**
- T1: Ana, unhas, amanhã às 14h, 1h30, domicílio, R$ 50, **sinal R$ 20**, Uber 30 min, custo R$ 15
- respostas certas da T4: chamar o transporte às **13h20** (folga de 10 min), **R$ 30** a receber, **R$ 35** de lucro
- T2: remarcar a Carla para sexta às 10h; T3: lembrete

**Trechos [A PREENCHER] (amarelos):** data e duração da entrevista, papéis, prints do protótipo e do Kanban, resultados dos testes, gráficos, parecer, ajustes, depoimentos, lições 2 e 3, nome do(a) professor(a).

## 6. Google Forms (texto completo entregue na conversa)

Seções: consentimento (+ autorização de imagem, **ampliar para fotos usando o protótipo**), perfil (**incluir "Qual celular você usou: Android/iPhone"**), tarefas T1–T4 (sucesso + tempo + respostas da T4), escala 1–5 (comparação com papel, transporte, carteira, intenção de uso), grade SUS com 10 itens, 3 perguntas abertas. Embaralhamento desativado. SUS: ímpares (r−1), pares (5−r), soma × 2,5.

**Orientação de validação:** Forms + **3 a 4 sessões acompanhadas** (presencial ou vídeo, com cronômetro) + remoto para completar 10–12. Pedir **print da tela final de cada tarefa** e fotos (mãos com o celular), recebidos **pelo WhatsApp**. Opcional: Maze ligado ao Figma.

## 7. Trello (criado em 19/11 via conector)

- Quadro: **https://trello.com/b/oAdxOXXC/agenda-bela-f108-grupo-31**
- Board ARI: `ari:cloud:trello::board/workspace/6afeed5c475ad636622b4e59/6afeefd4c2d240c7ff1fa542`
- Listas: Backlog, A fazer, Fazendo, Em teste, Concluído, Impedimentos.
- **Concluído** (marcados como feitos, com as datas reais na descrição): entrevista, brainstorming, documento, cadastro no Dream Shape.
- **Fazendo:** protótipo no Figma (21/11), Google Forms (21/11).
- **A fazer:**
  - definir papéis (19/11)
  - teste Android/iPhone (21/11)
  - recrutar 10–12 participantes (22/11)
  - aplicar testes (25/11)
  - métricas e gráficos (26/11)
  - parecer e lições (26/11)
  - enviar relatório (27/11)
- **Backlog:** Should/Could/Won't.
- Só o Arthur é membro: **convidar os outros 5**.
- **Decisão ética:** o usuário pediu para simular uso do Trello "desde outubro". Isso foi **recusado** (registro falso para avaliação, e o próprio Trello mostra as datas reais). O quadro registra o passado com as datas reais, e a adoção tardia do Kanban entra como lição aprendida. **Manter essa linha.**

## 8. Dream Shape (respostas já orientadas)

- Público-alvo: Micro e pequenos empreendedores, Mulheres, Outros ("Profissionais autônomas da beleza que atendem a domicílio"). O público é o **grupo real**, não a persona.
- Nº de beneficiadas: número **real** de participantes envolvidas (meta 12), sem estimativa de mercado.
- Espaço social: texto de cerca de 560 caracteres sobre Fortaleza-CE e o contexto de atendimento a domicílio.
- "Adicionar informações" (Nome/Localização/Público, 80 caracteres cada): cadastrar o grupo ou a entrevistada (com autorização).
- Áreas de desenvolvimento social: **Satisfação do Público**, **Aprendizado Prático**, **Competências Digitais**; **Incremento Financeiro** só como impacto *esperado*.
- Apps similares para citar:
  - agenda de beleza: Agenda da Beleza Profissionais, Booksy, Trinks
  - beleza a domicílio: Glamm, Singu (dados de 2016, confirmar)
  - finanças: SmartMei, Trinta
  - deslocamento: Google Maps/Uber, além do Google Agenda
  - diferencial: "não identificamos" outro que una agenda + hora do transporte + lucro com deslocamento

## 9. Arquivos deste pacote

| Arquivo | O que é |
|---|---|
| `Agenda_Bela_F108_v3.pdf` | Relatório v3 (a versão mais recente agora é `Agenda_Estilo_F108_v5.pdf`) |
| `scripts/gerar3.py` | Gera o PDF v3 (`exec` de `parts_head.py`, que faz `exec` de `base.py`) |
| `scripts/parts_head.py`, `scripts/base.py` | Estilos, fontes DejaVu, helpers `P`, `B`, `T`, `FILL`, `NOTA`, `card` |
| `scripts/redact.py` | OCR (tesseract) que cobre telefones nos prints |
| `prints_final/brainstorm_01..09.jpg` | Prints editados (ordem cronológica) |
| `Entrevista_e_Proposta_Inicial_F108.pdf` | Registro original da entrevista |
| `Proposta_de_Atividade_F108.pdf` | Enunciado do trabalho |

**Atenção:** os scripts usam caminhos absolutos `/home/claude/...` (prints, base.py, parts_head.py, saída do PDF) e fontes em `/usr/share/fonts/truetype/dejavu/`. Ajuste para o ambiente local (no Windows, aponte para uma cópia das fontes DejaVu). Dependências: `reportlab`, `Pillow` (e `pytesseract` + tesseract para o redact).

## 10. Próximos passos sugeridos

1. Confirmar com o Matheus: protótipo no **Figma** ou **código**? Se for código, ajustar a seção 4.7 (tipo de protótipo) e a 2.2 (matriz de tecnologia).
2. Distribuir os papéis restantes e atualizar a seção 6.2 do PDF e o card do Trello.
3. Montar o Forms com os 2 ajustes (celular usado; autorização de foto).
4. Rodar os testes (≥10, com 3–4 acompanhados) e preencher a tabela da 7.5.
5. Gerar os gráficos das métricas M1–M9 e preencher as seções 8.2–8.7. Calcular o SUS.
6. Atualizar o PDF (gerar v4), anexar as evidências e enviar no Dream Shape até 27/11.
7. Tirar o print do Kanban no fim de cada sprint.
8. Preferência pendente: o usuário mencionou uma skill de edição de imagens no repositório `~/Documents/angulo/repositorios/` (não encontrada em `portal_bi_angulo_unificado`; talvez esteja em `metabaese_bi_angulo_unificado`).

## 11. Princípios mantidos na conversa

- Não inventar dados de teste, resultados ou participação de pessoas. Os campos sem dados reais ficam em [A PREENCHER].
- Não simular histórico (Trello, datas).
- Privacidade: anonimizar participantes, ocultar telefones, pedir autorização de imagem.
- Escrever "Chatwoot" assim (preferência geral do usuário).
