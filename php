<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletando os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $genero = htmlspecialchars($_POST['genero']);
    $data_nascimento = htmlspecialchars($_POST['data_nascimento']);
    $cidade = htmlspecialchars($_POST['cidade']);
    $estado = htmlspecialchars($_POST['estado']);
    $endereco = htmlspecialchars($_POST['endereco']);
    
    // Exemplo de exibição dos dados (pode ser substituído por uma inserção no banco de dados ou outra lógica)
    echo "<h2>Dados Recebidos:</h2>";
    echo "Nome: " . $nome . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Telefone: " . $telefone . "<br>";
    echo "Gênero: " . $genero . "<br>";
    echo "Data de Nascimento: " . $data_nascimento . "<br>";
    echo "Cidade: " . $cidade . "<br>";
    echo "Estado: " . $estado . "<br>";
    echo "Endereço: " . $endereco . "<br>";
} else {
    echo "Por favor, envie o formulário.";
}
?>
