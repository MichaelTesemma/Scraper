import requests
from bs4 import BeautifulSoup

r = requests.get("http://localhost:3000")
soup = BeautifulSoup(r.content, "html.parser")

headings = soup.find_all('p')
news = soup.findAll("div", {"class": "row"})

for h in headings:
    print(h.text)
for i in news:
    print(i.text)

js = open('input.json', 'wb')
for chunk in headings.iter_content(1000):
    js.write(chunk)
