from transformers import pipeline
import sys

generator = pipeline("text-generation", model="distilgpt2")

idea = " ".join(sys.argv[1:])
result = generator(idea, max_length=200, do_sample=True, temperature=0.9)

# Final print - clean and simple
print(result[0]["generated_text"].encode("utf-8", errors="ignore").decode("utf-8"))
