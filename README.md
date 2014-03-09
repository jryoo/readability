readability
===========
This is an app built for the [Blueprint](https://www.github.com/calblueprint) Hackathon 2014: Save the Day Code for Good
![bp](http://bptech.berkeley.edu/assets/logo-full-large-d6419503b443e360bc6c404a16417583.png "BP Banner")

#About
This code is the backend to Helen Weng's Readability repo ios [App](https://github.com/helenaut/readabilityapp).

###API
- URL
```shell
http://readabilityscore.herokuapp.com/score/url
```

```json
{
    link: http://www.nytimes.com/article
}
```

```shell
curl -X POST -H "Content-Type: application/json" -d '{"link": "http://www.nytimes.com/2014/03/10/world/asia/malaysia-airlines-flight.html?hp"}' "http://readabilityscore.herokuapp.com/score/url"
```

- Image
```shell
http://readabilityscore.herokuapp.com/score/image
```

```json
{
    base64: ALKDENASdlksafiensdfasdflk...
}
```

```shell
curl -X POST -H "Content-Type: application/json" -d '{"base64": "/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUA..."}' "http://readabilityscore.herokuapp.com/score/image"
```

