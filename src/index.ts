import app from "./app"

app.get("/", (req, res) => {
  res.send("API AquaGas AI") 
})

app.listen(3000, () => {
  console.log("Server listening in port 3000")
})