# Currículo em Markdown - Carlos Vitor Botti Calvi

Seu currículo foi gerado em formato Markdown (`.md`) em duas línguas.

## Arquivos Gerados

### 🇧🇷 CV_PT.md (5.9 KB)
- Versão em Português do currículo
- Formato Markdown pronto para visualização e conversão

### 🇺🇸 CV_EN.md (5.6 KB)
- Versão em Inglês do currículo
- Tradução completa de todas as seções

---

## Como Visualizar

### Opção 1: GitHub/GitLab
- Faça upload dos arquivos `.md` para qualquer repositório
- GitHub e GitLab renderizam Markdown automaticamente
- Link direto pode ser compartilhado com recrutadores

### Opção 2: Visualizadores Online
- [Dillinger.io](https://dillinger.io/)
- [StackEdit.io](https://stackedit.io/)
- Abra o arquivo `.md`, visualize e exporte

### Opção 3: Editores de Código
- VS Code (extensão Markdown Preview Enhanced)
- Sublime Text (com plugins)
- Visual Studio Code (preview nativo `Ctrl+Shift+V`)

### Opção 4: Terminal
```bash
# Usando cat (view simples)
cat CV_PT.md

# Usando less (navegação)
less CV_PT.md
```

---

## Como Converter para PDF

### Opção 1: Pandoc (Recomendado)
```bash
# Instale o pandoc (se não tiver)
brew install pandoc

# Converter Português para PDF
pandoc CV_PT.md -o CV_PT.pdf --pdf-engine=xelatex -V geometry:margin=1in

# Converter Inglês para PDF
pandoc CV_EN.md -o CV_EN.pdf --pdf-engine=xelatex -V geometry:margin=1in
```

### Opção 2: Grip (GitHub Style)
```bash
# Instale o grip
brew install grip

# Gerar preview no navegador
grip CV_PT.md
grip CV_EN.md
```

### Opção 3: Marp (Apresentação)
```bash
# Instale o marp
npm install -g @marp-team/marp-cli

# Converter para PDF
marp CV_PT.md --pdf
marp CV_EN.md --pdf
```

### Opção 4: md-to-pdf
```bash
# Instale
npm install -g md-to-pdf

# Converter
md-to-pdf CV_PT.md
md-to-pdf CV_EN.md
```

### Opção 5: Usando VS Code
1. Abra o arquivo `.md` no VS Code
2. Instale a extensão "Markdown PDF"
3. Clique com botão direito no editor
4. Selecione "Markdown PDF: Export (pdf)"

---

## Conteúdo Incluído

### Seções Completas
- ✅ Cabeçalho com informações de contato
- ✅ Experiência Profissional (Founder & CEO - Dyagnosys Health)
- ✅ Educação (3 MBAs + 2 Bacharelados)
- ✅ Certificações (Coaching, Tecnologia, Microsoft, Qualidade)
- ✅ Projetos & Parcerias (Brasil-Suíça, Petrobras POC, EMBRAPII, SEBRAE)
- ✅ Competências (Empreendedorismo, Tecnologia, Desenvolvimento Humano)
- ✅ Produtos Desenvolvidos (AI-GAD-7, GAD-7, TSAI)
- ✅ Idiomas
- ✅ Resumo Profissional

### Destaques da Versão Atualizada
- 🏢 **Experiência como Founder & CEO** de startup tecnológica
- 🌍 **Reconhecimento internacional** (ApexBrasil, EMBRAPII, Innosuisse)
- 🤝 **Cooperação bilateral Brasil-Suíça** com instituições de prestígio
- 💰 **Busca de investimento** de US$ 2M para expansão global
- 📊 **POC em grande escala** com 41.000+ funcionários (Petrobras)
- 🎯 **Tecnologia validada** com 82% de precisão clínica

---

## Personalização

### Substituir Informações de Contato

No arquivo **CV_PT.md**, localize a linha 5:
```markdown
📧 [seu-email@exemplo.com.br] | 📱 [seu-telefone]
```

Substitua por:
```markdown
📧 carlos.calvi@email.com | 📱 (27) 99999-9999
```

No arquivo **CV_EN.md**, localize a linha 6:
```markdown
📧 [your-email@example.com] | 📱 [your-phone]
```

Substitua por:
```markdown
📧 carlos.calvi@email.com | 📱 +55 27 99999-9999
```

### Adicionar LinkedIn
Após a linha de contato, adicione:
```markdown
🔗 [linkedin.com/in/carloscalvi](https://linkedin.com/in/carloscalvi)
```

### Adicionar Site/Portfólio
```markdown
🌐 [dyagnosys.com](https://dyagnosys.com)
```

---

## Formatação

### Estilos Utilizados
- ✅ **Headings:** `#`, `##`, `###` para hierarquia
- ✅ **Bold:** `**texto**` para ênfase
- ✅ *Italic:* `*texto*` para datas e detalhes
- ✅ **Bullet points:** Lista para responsabilidades e itens
- ✅ **Tabela:** Para idiomas
- ✅ **Emojis:** Para destaque visual profissional
- ✅ **Separadores:** `---` para divisão de seções

### Pronto Para
- ✅ GitHub READMEs e perfis
- ✅ Visualização em navegadores
- ✅ Conversão para PDF
- ✅ Integração em sistemas ATS (Applicant Tracking Systems)

---

## Compartilhamento

### Link Direto (GitHub/GitLab)
```markdown
https://github.com/seu-usuario/seu-repo/blob/main/CV_PT.md
https://github.com/seu-usuario/seu-repo/blob/main/CV_EN.md
```

### Link Raw (Download Direto)
```markdown
https://raw.githubusercontent.com/seu-usuario/seu-repo/main/CV_PT.md
https://raw.githubusercontent.com/seu-usuario/seu-repo/main/CV_EN.md
```

### Repositório Profissional Sugerido
```
github.com/carloscalvi/cv
├── CV_PT.md
├── CV_EN.md
├── README.md (este arquivo)
└── .gitignore
```

---

## Comparação de Formatos

| Formato | Tamanho | Uso Recomendado |
|---------|---------|------------------|
| CV_PT.md | 5.9 KB | Portfólios online, GitHub, visualização rápida |
| CV_EN.md | 5.6 KB | Candidaturas internacionais, aplicações fora do Brasil |
| CV_Carlos_Vitor_Calvi.html | 9.3 KB | Impressão direta em navegador |
| CV_Carlos_Vitor_Calvi.txt | 9.7 KB | Sistemas legados, cópia e colagem |

---

## Suporte a Ferramentas

### Visualização
- ✅ GitHub
- ✅ GitLab
- ✅ Bitbucket
- ✅ VS Code
- ✅ Sublime Text
- ✅ Atom

### Conversão para PDF
- ✅ Pandoc
- ✅ Grip
- ✅ Marp
- ✅ md-to-pdf
- ✅ Typora
- ✅ MacDown

### Plataformas de Candidatura
- ✅ LinkedIn (importação de perfil)
- ✅ Indeed (anexo em PDF)
- ✅ Glassdoor (anexo em PDF)
- ✅ Nubank (formulários)
- ✅ Recrutadores diretos

---

## Dicas para Candidaturas

### 1. Usar a Versão Correta
- 🇧🇷 **CV_PT.md** para empresas brasileiras
- 🇺🇸 **CV_EN.md** para empresas internacionais ou multinacionais

### 2. Personalizar por Cargo
- Para **Tech Lead**: Emphasize skills in Technology section
- Para **CEO/Founder**: Emphasize Entrepreneurship section
- Para **Developer**: Emphasize AI/ML and Software Development

### 3. Destaques para Entrevista
- Experiência em cooperação internacional
- Liderança de equipe técnica
- Validação clínica da tecnologia (82% precisão)
- Escala do POC (41.000+ funcionários)

---

## Documentos Originais Utilizados

### Certificados e Diplomas
- Diploma Sistemas de Informação.pdf
- diploma_verso.jpg
- MBA Estratégia Empresarial.jpg
- MBA Gestão Financeira.jpg
- Mba gestão empresarial.jpg
- Certificado Administração.jpg
- Cerificado Sistemas de Informação.jpg
- Microsoft Certified Professional.jpg
- Empretec.jpg
- Lidership COACH.jpg
- Professional Life COACH.jpg
- PNL.jpg
- Linux SO.jpg
- Microsoft MOCs (1303, 2153, 2266A, 2276, 2824, 2830)
- PNCQ.jpg
- Furukawa Cable.jpg
- Panasonic.jpg

### Documentos de Negócios
- pitchDeckLatest.pdf
- DYAGSOFTWARE_CNPJ.pdf
- ApexBrasil_Letter_of_Support.pdf
- Email_Embrabii.pdf
- Carta_Sebrae_distrito_federal.pdf
- Bilateral-BR-SWZ-21-06-2023.pdf
- UFMG_2024-12-Letter_of_Support.pdf

---

## Foto Profissional

### Arquivo Incluído
- ✅ **vitor.jpg** (47 KB) - Foto profissional copiada para diretório de CVs

### Integração em Todos os Formatos

**Markdown (CV_PT.md e CV_EN.md):**
```markdown
![Carlos Vitor Calvi](./vitor.jpg)
```

**HTML (CV_Carlos_Vitor_Calvi.html):**
```html
<div class="photo-container">
    <img src="./vitor.jpg" alt="Carlos Vitor Calvi" class="photo">
</div>
```

### Estilo da Foto no HTML

- Tamanho: 120px x 120px (circular)
- Borda: 3px sólida (cor: #2c3e50)
- Sombras sutis para profundidade
- Centralizada no topo do currículo

### Observações da Foto

**Características:**
✅ Expressão amigável e confiante
✅ Traje profissional (terno, camisa, gravata)
✅ Alta resolução
✅ Foco nítido no rosto

**Contexto Original:**
- Foto de evento profissional "Fintech SURGE"
- Fundo com elementos de conferência

**Uso Atual:**
- ✅ Cabeçalho de todos os CVs
- ✅ Visualização em Markdown e HTML
- ✅ Pronta para conversão para PDF
- ✅ Compatível com renderizadores (GitHub, GitLab)

### Dicas de Uso

**Para LinkedIn:**
- Use o arquivo original vitor.jpg
- Recomenda-se cortar fundo para maior profissionalismo

**Para Impressão em PDF:**
- A foto será renderizada automaticamente
- Mantém qualidade e proporções
- Posição: centralizada no topo

---

*Data de criação: 12 de março de 2026*
*Versão: 2.1 - Added professional photo to all CV formats*
