const coinContainer = document.getElementById('coinContainer');
        const coin = document.getElementById('coin');
        const result = document.getElementById('result');
        const flipButton = document.getElementById('flipButton');

        let isFlipping = false;

        function flipCoin() {
            if (isFlipping) return;

            isFlipping = true;
            result.textContent = 'Flipping...';
            flipButton.disabled = true;

            const flipDuration = 2000;
            const randomRotation = Math.floor(Math.random() * 5 + 5) * 360;
            coin.style.animation = `flip ${flipDuration}ms ease-out forwards`;
            coin.style.transform = `rotateX(${randomRotation}deg) rotateY(${randomRotation * 2}deg) rotateZ(${randomRotation / 2}deg)`;

            setTimeout(() => {
                const random = Math.random();
                const outcome = random < 0.5 ? 'Heads' : 'Tails';
                result.textContent = outcome;
                coin.style.transform = `rotateY(${outcome === 'Heads' ? 0 : 180}deg)`;
                isFlipping = false;
                flipButton.disabled = false;
                coin.style.animation = '';
            }, flipDuration);
        }

        flipButton.addEventListener('click', flipCoin);
        coinContainer.addEventListener('click', flipCoin);

        // Add hover effect
        coinContainer.addEventListener('mousemove', (e) => {
            if (!isFlipping) {
                const rect = coinContainer.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                coin.style.transform = `rotateX(${-y / 5}deg) rotateY(${x / 5}deg)`;
            }
        });

        coinContainer.addEventListener('mouseleave', () => {
            if (!isFlipping) {
                coin.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }
        });