{% macro field(name, value = '', type = 'text') %}
::: {{ name }}
{{ value }} [{{ type }}]{style="color:red"}
:::
{% endmacro %}

{% macro label(text) %}
::: label
{{ text }}
:::
{% endmacro %}
