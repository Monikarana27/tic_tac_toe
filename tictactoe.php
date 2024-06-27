<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $player1 = $_POST['player1'];
    $player2 = $_POST['player2'];
    $winner = $_POST['winner'];

    $conn = new mysqli('localhost', 'root', '', 'tic_tac_toe_db');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO game_results (player1, player2, winner) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $player1, $player2, $winner);

    if ($stmt->execute()) {
        echo "Game result stored successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<form method="post" action="tictactoe.php">
    Player 1: <input type="text" name="player1" required><br>
    Player 2: <input type="text" name="player2" required><br>
    Winner: <input type="text" name="winner" required><br>
    <button type="submit">Submit Result</button>
</form>