from django.db import models
from django.core.urlresolvers import reverse

class Title(models.Model):
    name = models.CharField(max_length=128)
    year = models.IntegerField()
    director = models.CharField(max_length=128)
    rating = models.IntegerField(
        default=6,
        help_text="Rating in half-star intervals, 10 == 5 stars.")

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("update_title", kwargs={'pk': self.pk})
