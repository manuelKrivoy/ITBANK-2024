# views.py
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Empleado
from .forms import EmpleadoForm

# Vista para listar empleados
class EmpleadoListView(ListView):
    model = Empleado
    template_name = 'empleados/lista_empleados.html'
    context_object_name = 'empleados'

# Vista para ver el detalle de un empleado
class EmpleadoDetailView(DetailView):
    model = Empleado
    template_name = 'empleados/detalle_empleado.html'

# Vista para crear un nuevo empleado
class EmpleadoCreateView(CreateView):
    model = Empleado
    form_class = EmpleadoForm
    template_name = 'empleados/crear_empleado.html'
    success_url = reverse_lazy('lista_empleados')

# Vista para editar un empleado existente
class EmpleadoUpdateView(UpdateView):
    model = Empleado
    form_class = EmpleadoForm
    template_name = 'empleados/editar_empleado.html'
    success_url = reverse_lazy('lista_empleados')

# Vista para eliminar un empleado
class EmpleadoDeleteView(DeleteView):
    model = Empleado
    template_name = 'empleados/eliminar_empleado.html'
    success_url = reverse_lazy('lista_empleados')
