import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {Paper, Grid} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core/styles";
import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import dateFormat from 'dateformat';
import format from "date-fns/format";
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Icon from "@material-ui/core/Icon";
// import  ClockIcon from '@material-ui/icons/ClockIcon';
// import { yearsToMonths, yearsToMonths } from 'date-fns';
import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";
import jaLocale from "date-fns/locale/ja";
import koLocale from "date-fns/locale/ko";
import zhLocale from "date-fns/locale/zh-CN";
import thLocale from "date-fns/locale/th";
import arLocale from "date-fns/locale/ar-DZ";
import heLocale from "date-fns/locale/he";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useState, useCallback } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import SelectTimezoneMaterialUi from 'input-material-ui';
import SettingsIcon from '@material-ui/icons/Settings';
import SvgIcon from '@material-ui/core/SvgIcon';
import TimezoneSelect from "react-timezone-select"
import NumberFormat from 'react-number-format';
import { intlFormat } from "date-fns";
// import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timezoneNames, ZonedDate } from "@progress/kendo-date-math";
import "@progress/kendo-date-math/tz/all";
import * as ReactDOM from "react-dom";
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Language } from "@material-ui/icons";
function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
    ja: jaLocale,
    ko: koLocale, 
    zh: zhLocale,
    th: thLocale,
    ar: arLocale,
    he: heLocale,
  };
  class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
      return format(date, "LLLL", { locale: this.locale });
    }
  
    getDatePickerHeaderText(date) {
      return format(date, "EEEE dd MMMM yyyy", { locale: this.locale });
    }
  }
  
  class FrLocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
    getDatePickerHeaderText(date) {
        return format(date, "EEEE dd MMMM yyyy", { locale: this.locale });
    }
  }
   class ThLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
      return format(date, "LLLL", { locale: this.locale });
    }
    getDatePickerHeaderText(date) {
        return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
      } 
    }
    class JaLocalizedUtils extends DateFnsUtils {
     getCalendarHeaderText(date) {
        return format(date, "LLLL", { locale: this.locale });
        }
        getDatePickerHeaderText(date) {
            return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
          }
        }
    class KoLocalizedUtils extends DateFnsUtils {
         getCalendarHeaderText(date) {
            return format(date, "LLLL", { locale: this.locale });
            }
            getDatePickerHeaderText(date) {
             return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
      }
    }
    class ZhLocalizedUtils extends DateFnsUtils {
        getCalendarHeaderText(date) {
          return format(date, "LLLL", { locale: this.locale });
        }
        getDatePickerHeaderText(date) {
            return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
          }
        }
     class ArLocalizedUtils extends DateFnsUtils {
         getCalendarHeaderText(date) {
            return format(date, "LLLL", { locale: this.locale });
            }
         getDatePickerHeaderText(date) {
                return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
              }
            } 
    class HeLocalizedUtils extends DateFnsUtils {
        getCalendarHeaderText(date) {
            return format(date, "LLLL", { locale: this.locale });
                }
        getDatePickerHeaderText(date) {
            return format(date,"EEEE d MMMM yyyy", { locale: this.locale });
         }
      }
  const localeUtilsMap = {
    en: DateFnsUtils,
    fr: FrLocalizedUtils,
    ru: RuLocalizedUtils,
    ja: JaLocalizedUtils,
    ko: KoLocalizedUtils,
    zh: ZhLocalizedUtils,
    th: ThLocalizedUtils,
    ar: ArLocalizedUtils,
    he: HeLocalizedUtils,

  };
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [locale, setLocale] = useState("en");
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = useCallback(e => {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    }, []);
  
    const selectLocale = useCallback(locale => {
      setLocale(locale);
      setAnchorEl(null);
    }, []);

    const localeFormatMap = {
        en: "MMMM d, yyyy",
        fr: "d MMM yyyy",
        ru: "d MMM yyyy",
        ja: "yyyy MMM d",
        ko: "yyyy MMM d",
        zh: "yyyy MMM d",
        th: "EEEE d MMMM yyyy", 
        ar: "yyyy MMM d",
        he: "yyyy MMM d",
      };
      
      const localeCancelLabelMap = {
        en: "cancel",
        fr: "annuler",
        ru: "отмена",
        th: "ยกเลิก",
        ja: "キャンセル",
        ko: "취소",
        zh: "取消",
        ar: "إلغاء",
        he: "לְבַטֵל", 
      };
      const localeOkLabelMap = {
        en: "OK",
        fr: "OK",
        ru: "дать согласие",
        th: "ตกลง", 
        ja: "同意",
        ko: "동의하다",
        zh: "同意",
        ar: "يوافق على",
        he: "לְהַסכִּים",
      };
      const localeSettingLabelMap = {
        en: "setting",
        fr: "réglage",
        ru: "параметр согласие",
        th: "การตั้งค่า", 
        ja: "setting",
        ko: "환경",
        zh: "环境",
        ar: "ضبط",
        he: "הגדרה",
      };
      const localeLaunguageLabelMap = {
        en: "Launguage",
        fr: "Langue",
        ru: "параметр согласие",
        th: "ภาษา", 
        ja: "言語",
        ko: "환경",
        zh: "环境",
        ar: "ضبط",
        he: "הגדרה",
      };
      const localeTimezoneLabelMap = {
        en: "TimeZone",
        fr: "fuseau horaire",
        ru: "часовой пояс",
        th: "ไทม์โซน", 
        ja: "タイムゾーン",
        ko: "환경",
        zh: "环境",
        ar: "ضبط",
        he: "אזור זמן",
      };
      const localeNumberFormatMap = {
        en: "OK",
        fr: "OK",
        ru: "дать согласие",
        th: "ตกลง", 
        ja: "同意",
        ko: "동의하다",
        zh: "zh",
        ar: "ar-SA",
        he: "OK",
      };
      const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};
return (
    <div>
        
<Language
open={handleClickOpen}>
     </Language>


            
     </div>
     );
}
