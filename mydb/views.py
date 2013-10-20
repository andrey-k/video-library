from django.views.generic import (ListView, UpdateView, CreateView, DeleteView,
                                  TemplateView)
from models import Title
from django.core.urlresolvers import reverse
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect

class TitleListView(ListView):
    model = Title
    queryset = Title.objects.order_by('name')
    context_object_name = "titles"

    def get_queryset(self):
        if 'sort_by' in self.kwargs:
            if 'year' in self.kwargs['sort_by']:
                return Title.objects.order_by('year', 'name')
        
        return Title.objects.order_by('name')

class TitleCreateView(CreateView):
    model = Title
    context_object_name = "title"

    def get_success_url(self):
        return reverse('title_list')


class TitleUpdateView(UpdateView):
    model = Title
    context_object_name = "title"

    def get_success_url(self):
        return reverse('title_list')

class TitleDeleteView(DeleteView):
    model = Title
    context_object_name = "title"
    success_url = "/"

@csrf_protect
def DeleteMultipleTitles(request):
    pk_to_be_removed = json.loads(request.body)
    Title.objects.filter(id__in=pk_to_be_removed).delete()
    return HttpResponse("OK")

@csrf_protect
def UpdateRating(request):
    jsonData = json.loads(request.body)
    Title.objects.filter(pk=jsonData[0]).update(rating=jsonData[1])
    return HttpResponse("OK")
