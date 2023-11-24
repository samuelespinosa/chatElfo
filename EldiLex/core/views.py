from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    return render(request, "core/home.html")

def chat(request):
    return render(request, "core/chat.html")

def misPalabras(request):
    return render(request, "core/misPalabras.html")


def diccionario(request):
    return render(request, "core/diccionario.html")

def login(request):
    return render(request, "core/login.html")





