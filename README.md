# Agenda Estilo — F108 (UNIFOR) · Grupo 31

Site **mobile first** para profissionais autônomos de beleza e estética (manicures, maquiadoras,
barbeiros, esteticistas…) que atendem a domicílio. Junta três coisas em um lugar só:

1. **Agendamento**: cliente, serviço, data, início, duração e local (estúdio ou domicílio).
2. **Deslocamento**: o mapa mostra a rota, a profissional digita o tempo e o site calcula
   **a hora de chamar o transporte** (início − deslocamento − folga), com lembrete na agenda do celular.
3. **Carteira**: valor, sinal pago, restante a receber, custo do deslocamento e lucro.

Não tem servidor nem conta: os dados ficam **só no navegador** do celular.

**No ar:** <https://arthur-honorio.github.io/agenda_estilo/>

> O projeto começou como **Agenda Bela**.

## Como rodar

Precisa do [Node.js](https://nodejs.org) 22 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

O `dev` já sobe com `--host`: para testar no celular, conecte-o na mesma rede Wi-Fi e abra
o endereço "Network" que aparece no terminal.

| Comando | O que faz |
|---|---|
| `npm test` | roda os testes (Vitest) |
| `npm run test:watch` | testes em modo observação |
| `npm run lint` | verifica o código (oxlint) |
| `npm run build` | gera o site em `dist/` |
| `npm run preview` | serve o `dist/` localmente |

## Publicação

Cada push na `main` dispara o workflow `.github/workflows/deploy.yml`: ele roda lint e testes,
gera o build e publica no **GitHub Pages**. Se algum teste falhar, nada é publicado e a versão
anterior continua no ar. (Configuração única no GitHub: *Settings → Pages → Source: GitHub Actions*.)

## Estrutura

```
src/
  domain/        regras do negócio, sem React (hora do transporte, carteira, datas, dinheiro)
  pages/         uma tela por arquivo: Agenda, Novo atendimento, Carteira, Meus dados
  components/    peças reutilizáveis (Layout com a navegação inferior)
  styles/        CSS global (cores, acessibilidade)
docs/
  proposta/      enunciado do trabalho
  pesquisa/      registro da entrevista e prints do brainstorming (telefones ocultos)
  relatorio/     relatório em PDF e os scripts que o geram
  HANDOFF_...md  contexto completo do projeto (decisões, requisitos, cenário de teste)
```

Convenções do código: datas em `AAAA-MM-DD`, horas em `HH:MM` e **dinheiro em centavos**
(inteiro). Use `formatarReais` e `paraCentavos` de `src/domain/dinheiro.ts` para exibir e ler valores.

## Relatório (PDF)

O relatório é gerado por script Python com ReportLab. As fontes DejaVu já estão em `docs/relatorio/fonts/`.

```bash
python -m venv .venv
.venv/Scripts/python -m pip install -r docs/relatorio/scripts/requirements.txt   # Windows
.venv/Scripts/python docs/relatorio/scripts/gerar_relatorio.py
```

No Linux/macOS, troque `.venv/Scripts/python` por `.venv/bin/python`. O PDF sai em
`docs/relatorio/Agenda_Estilo_F108_v<VERSAO>.pdf`. Antes de gerar uma versão nova, aumente
`VERSAO` no topo de `gerar_relatorio.py`.

## Escopo do MVP

**Must (entra agora):** RF01–RF12, ou seja, cadastro com local, linha do tempo do dia, busca,
remarcar/desmarcar, mapa + tempo + hora do transporte, lembrete no Google Agenda,
valor/sinal, custo, lucro e carteira do dia.
**Should:** RF13 (aviso de conflito), RF14 (resumos), RF15 (clientes), RF16 (% de sinal), RF20 (apagar dados).
**Won't nesta versão:** backup, PWA com notificações, cálculo automático de rota.

A lista completa de requisitos e histórias de usuário (HU01–HU09) está no relatório em `docs/relatorio/`.

## Cenário do teste com usuárias

O site precisa dar estes resultados (estão fixados nos testes de `src/domain/`):

- **T1:** Ana, unhas, amanhã às 14h, 1h30, domicílio, R$ 50, sinal de R$ 20, Uber de 30 min, custo de R$ 15
- **T4:** chamar o transporte às **13h20** (folga de 10 min), **R$ 30** a receber, **R$ 35** de lucro

## Equipe

Arthur Honorio do Carmo (PO) · Joel da Silva de Oliveira · Matheus Domingues Sales ·
Luana Magalhães de Souza Alves · Matheus Sousa de Carvalho · Thayná Nascimento Albano da Silva

Quadro Kanban: <https://trello.com/b/oAdxOXXC/agenda-bela-f108-grupo-31>
