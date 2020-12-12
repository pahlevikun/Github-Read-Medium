<p align="center">
 
 <h2 align="center">GitHub Read Medium</h2>
 <p align="center">Show your recent Medium post on GitHub! Github read Medium!</p>
</p>
<br>
 
## Getting Started

Import this link in README.md or any markdown file as image source. This can be use anywhere

**Minimum format**

```bash
  https://github-read-medium-git-main.pahlevikun.vercel.app/latest?username=`your_medium_username`
```

**Sample**

Markdown:

```markdown
 [Medium](https://github-read-medium-git-main.pahlevikun.vercel.app/latest?username=pahlevikun)
```

Html: 

```html
<img src="https://github-read-medium-git-main.pahlevikun.vercel.app/latest?username=`your_medium_username`"/>
```

**Result**

![Medium](https://github-read-medium-git-main.pahlevikun.vercel.app/latest?username=pahlevikun) 

### Options
| parameter | default | required | description                        |
|-----------|---------|----------|------------------------------------|
| username  | ""      | YES      | Your medium username               |
| limit     | 1       | NO       | Limit of articles you want to show, maximum is 10 |
| theme     | default   | NO       | Card style, please go to this [link](https://github.com/anuraghazra/github-readme-stats/blob/master/themes/README.md) for all theme                       |

### Deploy your own
GitHub API only allow 5k RPH, if you want to use this, **please deploy your app in your vercel account by clicking button below**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/omidnikrah/github-readme-medium)
