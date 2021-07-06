import requests
res = requests.get("http://localhost:3000")
res.raise_for_status()
playFile = open('input.json', 'wb')
for chunk in res.iter_content(1000):
    playFile.write(chunk)

playFile.close