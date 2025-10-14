export default function handler(req, res) {
    const catFacts = [
        "Кошки могут прыгать в 6 раз выше своего роста.",
        "У кошек 32 мышцы в каждом ухе.",
        "Кошки могут издавать более 100 различных звуков.",
        "Кошки спят около 16 часов в день.",
        "У кошек есть специальное чувство, позволяющее им находить хозяев."
    ];

    const randomIndex = Math.floor(Math.random() * catFacts.length);
    const fact = catFacts[randomIndex];

    res.status(200).json({ fact });
}