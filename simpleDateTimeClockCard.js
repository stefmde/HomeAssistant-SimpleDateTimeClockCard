class SimpleDateTimeClockCard extends HTMLElement
{
    set hass(hass)
    {
        if (!this.content)
        {
            var config = this.config;
            const card = document.createElement('HA-card');
            this.content = document.createElement('div');
            this.content.style.paddingLeft = this.config.global_padding_left_size !== undefined ? this.config.global_padding_left_size : '0px';
            this.content.style.paddingRight = this.config.global_padding_right_size !== undefined ? this.config.global_padding_right_size : '0px';
            this.content.style.paddingTop = this.config.global_padding_top_size !== undefined ? this.config.global_padding_top_size : '15px';
            this.content.style.paddingBottom = this.config.global_padding_bottom_size !== undefined ? this.config.global_padding_bottom_size : '15px';
            this.content.style.textAlign = this.config.global_text_align !== undefined ? this.config.global_text_align : 'center';

            var timeDiv = document.createElement('div');
            timeDiv.style.lineHeight = '1em';
            var dateDiv = document.createElement('div');
            dateDiv.style.lineHeight = '1em';
            
            timeDiv.style.fontSize = this.config.time_font_size !== undefined ? this.config.time_font_size : '5em';
            dateDiv.style.fontSize = this.config.date_font_size !== undefined ? this.config.date_font_size : '2em';

            card.appendChild(this.content);
            this.appendChild(card);
            var content = this.content;
            getContent();
            setInterval(getContent, this.config.global_update_interval_ms !== undefined ? this.config.global_update_interval_ms : 1000);

            function getContent()
            {
                let today = new Date()
                let time_str = getTime(today);
                let date_str = getDate(today);

                timeDiv.innerHTML = time_str;
                dateDiv.innerHTML = date_str;
                content.innerHTML = timeDiv.outerHTML + dateDiv.outerHTML;
            }

            function getTime(today)
            {
                let time_show = config.time_show !== undefined ? config.time_show : true;
                let time_separator_char = config.time_separator_char !== undefined ? config.time_separator_char : ":";
                let time_separator_blink = config.time_separator_blink !== undefined ? config.time_separator_blink : false;
                let time_hours_24 = config.time_hours_24 !== undefined ? config.time_hours_24 : true;
                let time_hours_lead_zero = config.time_hours_lead_zero !== undefined ? config.time_hours_lead_zero : true;
                let time_minutes_lead_zero = config.time_minutes_lead_zero !== undefined ? config.time_minutes_lead_zero : true;
                let time_seconds_show = config.time_seconds_show !== undefined ? config.time_seconds_show : true;
                let time_seconds_lead_zero = config.time_seconds_lead_zero !== undefined ? config.time_seconds_lead_zero : true;
                let time_seconds_font_size = config.time_seconds_font_size !== undefined ? config.time_seconds_font_size : config.time_font_size;
                let time_seconds_visibility_percentage = config.time_seconds_visibility_percentage !== undefined ? config.time_seconds_visibility_percentage : "100%";

                if(!time_show) return "";

                let h = today.getHours();
                let m = today.getMinutes();
                let s = today.getSeconds();
                let p = ( h < 12 ) ? "AM" : "PM";

                h = time_hours_lead_zero ? addZero(h) : h;
                m = time_minutes_lead_zero ? addZero(m) : m;
                s = time_seconds_lead_zero ? addZero(s) : s;

                let time_separator_char_current = s % 2 == 0 || !time_separator_blink ? time_separator_char : " ";

                let time_str = h;
                // HOUR
                if(!time_hours_24 && h >= 13)
                {
                    time_str = h - 12;
                }
                
                time_str += time_separator_char_current + m; // MINUTE

                if(time_seconds_show) // SECONDS
                {
                    time_str += "<span style=\"font-size:" + time_seconds_font_size + "; ";

                    // Visibility
                    let foregroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-text-color');
                    let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-background-color');
                    time_str += "color: color-mix(in srgb, " + foregroundColor + " " + time_seconds_visibility_percentage + ", " + backgroundColor + ");"

                    time_str += "\">";
                    time_str += time_separator_char_current + s;
                    time_str += "</span>";
                }

                time_str += (time_hours_24 ? "" : " " + p ); // AM/PM

                return time_str;
            }

            function getDate(today)
            {
                let date_show = config.date_show !== undefined ? config.date_show : true;
                let date_locale = config.date_locale !== undefined ? config.date_locale : "en-US";
                let date_separator_char = config.date_separator_char !== undefined ? config.date_separator_char : ".";
                let date_us_format = config.date_us_format !== undefined ? config.date_us_format : false;
                let date_week_day_name_show = config.date_week_day_name_show !== undefined ? config.date_week_day_name_show : true;
                let date_week_day_name_long = config.date_week_day_name_long !== undefined ? config.date_week_day_name_long : false;
                let date_days_lead_zero = config.date_days_lead_zero !== undefined ? config.date_days_lead_zero : true;
                let date_months_lead_zero = config.date_months_lead_zero !== undefined ? config.date_months_lead_zero : true;
                let date_week_number_show = config.date_week_number_show !== undefined ? config.date_week_number_show : false;
                let date_week_number_label = config.date_week_number_label !== undefined ? config.date_week_number_label : "KW";
                let date_year_two_digit = config.date_year_two_digit !== undefined ? config.date_year_two_digit : false;

                if(!date_show) return "";

                let d = today.getDate(); // the day of the month (from 1-31)
                let m = today.getMonth()+1; // the month (from 0-11)
                let y = today.getFullYear(); // 0000
                let w = getWeekNumber(today);
                let wn = getWeekDayName(today, date_locale, date_week_day_name_long);

                d = date_days_lead_zero ? addZero(d) : d;
                m = date_months_lead_zero ? addZero(m) : m;
                y = date_year_two_digit ? y.toString().substring(2) : y;

                let date_str = 
                (date_week_day_name_show ? wn + " " : "") + // WeekDayName
                (date_us_format ? m + date_separator_char + d + date_separator_char : d + date_separator_char + m + date_separator_char) + 
                y +
                (date_week_number_show ? " " + date_week_number_label + w : ""); // KW

                return date_str;
            }

            function getWeekNumber(today)
            {
                var d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
                var dayNum = d.getUTCDay() || 7;
                d.setUTCDate(d.getUTCDate() + 4 - dayNum);
                var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
                return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
            }

            function getWeekDayName(today, locale, long)
            {
                return today.toLocaleDateString(locale, { weekday: long ? 'long' : 'short' });       
            }

            function addZero(i)
            {
                if (i < 10)
                {
                    i = "0" + i;
                }
                return i;
            }
        }
    }

    setConfig(config) {
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('simple-date-time-clock-card', SimpleDateTimeClockCard);