
# SimpleDateTimeClockCard for HomeAssistant
![Header image to show a sample of this card](img/header.png)

## Properties
### Global

| Name | Type | Default | Description |
|--|--|--|--|
| `global_text_align` | `string` | `center` | |
| `global_paddingLeft_size` | `string` | `0px` | |
| `global_paddingRight_size` | `string` | `0px` | |
| `global_paddingTop_size` | `string` | `15px` | |
| `global_paddingBottom_size` | `string` | `15px` | |
| `global_update_interval_ms` | `int` | `1000` | |

  

### Time
| Name | Type | Default | Description |
|--|--|--|--|
| `time_show` | `bool` | `true` | |
| `time_font_size` | `string` | `5em` | |
| `time_hours_24` | `bool` | `true` | |
| `time_hours_lead_zero` | `bool` | `true` | |
| `time_minutes_lead_zero` | `bool` | `true` | |
| `time_seconds_font_size` | `bool` | `true` | |
| `time_seconds_show` | `bool` | `true` | |
| `time_seconds_lead_zero` | `bool` | `true` | |
| `time_seconds_visibility_percentage` | `string` | `100%` | |

  

### Date

| Name | Type | Default | Description |
|--|--|--|--|
| `date_show` | `bool` | `true` | |
| `date_locale` | `string` | `en-US` | |
| `date_font_size` | `string` | `2em` | |
| `date_days_lead_zero` | `bool` | `true` | |
| `date_week_day_name_show` | `bool` | `true` | |
| `date_week_day_name_long` | `bool` | `false` | |
| `date_week_number_show` | `bool` | `false` | |
| `date_months_lead_zero` | `bool` | `true` | |

## Samples
### My favorit
![Header image to show a sample of this card](img/header.png)

    type: custom:simple-date-time-clock-card
	time_seconds_visibility_percentage: 30%
	time_seconds_font_size: 0.5em
	date_week_number_show: true

### No special config
![Header image to show a sample of this card](img/no-special-config.png)

    type: custom:simple-date-time-clock-card


### Minimal UI
![Header image to show a sample of this card](img/minimal-ui-config.png)

    type: custom:simple-date-time-clock-card
    time_hours_24: true
    time_seconds_show: false
    date_week_day_name_show: false


### Just the Clock
![Header image to show a sample of this card](img/just-the-clock-config.png)

    type: custom:simple-date-time-clock-card
    time_hours_24: true
    time_seconds_show: true
    date_show: false


### Just the Date
![Header image to show a sample of this card](img/just-the-date-config.png)

    type: custom:simple-date-time-clock-card
    time_show: false
    date_font_size: 5em
    date_week_day_name_show: true

