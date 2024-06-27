document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authDiv = document.getElementById('auth');
    const gameDiv = document.getElementById('game');
    const ball = document.getElementById('ball');
    const holes = document.querySelectorAll('.hole');

    let username = '';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('loginUsername').value,
                password: document.getElementById('loginPassword').value,
            }),
        });
        if (response.ok) {
            username = document.getElementById('loginUsername').value;
            authDiv.style.display = 'none';
            gameDiv.style.display = 'block';
            startGame();
        } else {
            alert('Login failed');
        }
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('signupUsername').value,
                password: document.getElementById('signupPassword').value,
            }),
        });
        if (response.ok) {
            alert('Sign up successful');
        } else {
            alert('Sign up failed');
        }
    });

    function startGame() {
        let ballX = 290;
        let ballY = 290;
        ball.style.top = ballY + 'px';
        ball.style.left = ballX + 'px';

        gameDiv.addEventListener('click', () => {
            ballX += (Math.random() - 0.5) * 100;
            ballY += (Math.random() - 0.5) * 100;
            ball.style.top = ballY + 'px';
            ball.style.left = ballX + 'px';

            checkForLoss();
        });

        function checkForLoss() {
            holes.forEach(hole => {
                const holeRect = hole.getBoundingClientRect();
                const ballRect = ball.getBoundingClientRect();

                if (
                    ballRect.left > holeRect.left &&
                    ballRect.right < holeRect.right &&
                    ballRect.top > holeRect.top &&
                    ballRect.bottom < holeRect.bottom
                ) {
                    alert('Game over!');
                    sendResult();
                    authDiv.style.display = 'block';
                    gameDiv.style.display = 'none';
                }
            });
        }

        async function sendResult() {
            await fetch('/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
        }
    }
});