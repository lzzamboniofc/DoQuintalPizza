# Do Quintal Pizza

Site institucional da **Do Quintal Pizza**, em Itu/SP. O projeto mantém a experiência visual original e agora usa Node.js com Vite para desenvolvimento e geração da versão de produção.

## Desenvolvimento local

Requisitos: Node.js 20.19 ou superior.

```bash
npm install
npm run dev
```

O Vite informará o endereço local no terminal.

## Gerar a versão de produção

```bash
npm run build
```

A build é criada em `dist/` e, ao final, sincronizada automaticamente com a raiz do repositório. Isso preserva a configuração atual do GitHub Pages:

- branch: `main`
- pasta: `/root`

Os arquivos dentro de `site/` são as páginas-fonte. Os recursos estáticos ficam em `public/`. Os HTMLs e a pasta `assets/` da raiz são a versão publicada e não devem ser editados manualmente.

## Estrutura

```text
site/       páginas-fonte
public/     imagens, estilos, scripts, PDF e arquivos de SEO
scripts/    sincronização da build com a raiz
dist/       build local, ignorada pelo Git
```

## Telefone e WhatsApp

Quando o número estiver disponível, edite `public/assets/js/config.js` e execute `npm run build` novamente.
