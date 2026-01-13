from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

compliments = {
    "friendly": [
        "You have a great vibe that makes people feel comfortable.",
        "Your positivity lights up the room.",
        "You make people feel welcome without even trying",
        "Talking to you always feels easy and natural.",
        "You have a genuinely kind heart, and it shows.",
        "Your presence makes any place feel better.",
        "You are someone others can depend on.",
        "Being around you is always refreshing.",
        "You have a way of making people feel special.",
        "You make ordinary moments special."
    ],
    "romantic": [
        "You make my world feel calmer and brighter at the same time.",
        "You are effortlessly attractive in the most genuine way.",
        "Every moment with you feels meaningful.",
        "You have a way of making my heart feel understood.",
        "Your smile is my favorite sight.",
        "You make me feel cherished just by being yourself.",
        "I love how you make even the simplest things feel special.",
        "Just thinking about you brings a smile to my face.",
        "You are not just special—you are unforgettable.",
        "Being with you feels like home."
    ],
    "cute": [
        "Your smile is ridiculously adorable.",
        "You make even the simplest things look adorable.",
        "Even when you are serious, you are still cute.",
        "You have a soft, comforting charm.",
        "You are cute in the most natural way.",
        "You are the kind of cute that never gets old.",
        "Your presence brings joy to everyone around you."
    ],
    "motivational": [
        "You are stronger than you think.",
        "Progress looks good on you.",
        "Every step you take is a step toward your goals.",
        "Keep pushing forward; you're doing great.",
        "Believe in your potential; it's limitless.",
        "Your determination will take you far.",
        "Believe in yourself as much as I believe in you.",
        "You have everything it takes to succeed."
    ]
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate_compliment():
    data = request.get_json()
    name = data.get("name", "")
    tone = data.get("tone", "friendly")
    mood = data.get("mood", "")

    compliment = random.choice(compliments.get(tone, compliments["friendly"]))

    if name:
        compliment = f"{name}, {compliment}"

    if mood == "sad":
        compliment += " Remember, tough times never last."

    return jsonify({"compliment": compliment})

if __name__ == "__main__":
    app.run(debug=True)
