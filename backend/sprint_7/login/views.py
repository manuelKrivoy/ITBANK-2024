# FILE: login/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import LoginForm, RegisterForm

def login_view(request):
    if request.user.is_authenticated:
        return redirect('clientes:index')  

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('clientes:index') 
    else:
        form = LoginForm()
    return render(request, 'login/login.html', {'form': form})

def register_view(request):
    if request.user.is_authenticated:
        return redirect('clientes:index')  

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login:login')  
    else:
        form = RegisterForm()
    return render(request, 'login/register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login:login') 