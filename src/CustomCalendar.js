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
import Select from '@mui/material/Select';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

var number = 123456789;
console.log(new Intl.NumberFormat('de-DE').format(number));
console.log(new Intl.NumberFormat('ar-EG').format(number));
console.log(new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(number));
console.log(new Intl.NumberFormat('th-TH').format(number));
const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#1c2b36",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "black",
                color: "white",
            },
            dayLabel:{
                color:"#61dafb",
            },
            iconButton:{
                backgroundColor:"#2eaccf",
            },
        },
        MuiPaper:{
            root:{
                color:"white",
                backgroundColor:"#242f39"
            },
        },
        MuiPickersStaticWrapper:{
            staticWrapperRoot:{
                backgroundColor:"#1c2b36",
            },
        },
        MuiIconButton:{
            root:{
                color:"gray",
                padding:"5px",
            },
            label:{
                name:""
            }
        },
        MuiSvgIcon:{
            root:{
                fontSize: "1rem",
            },
        },
        MuiInputBase:{
            input:{
                color: "white",
                background: "#223542",
                borderRadius: "10px", 
            }, 
        },
        MuiButton:{
            textPrimary:{
                color: "#20bcd7",
            },
        },
        MuiListItem: {
            root: {
               "&$selected": {
                  backgroundColor: "#2a8697",
                  color:"black",
               },
               "&:hover": {
                backgroundColor: "#54656a96",
                },
            },
        },
        MuiMenuItem:{
            root:{
                "&:hover": {
                    backgroundColor: "#54656a96",
                 }, 
            },
        },
    },
});

export const styles = makeStyles(() => ({

    notInThisMonthDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#0000003d",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
    },
    normalDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#54656a52",
        margin: "3px",
        // boxShadow: "none",
        // borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
    },
    selectedDayPaper: {
        width: "31px",
        height: "31px",
        backgroundColor: "#3593af6b",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#20bcd7",
        padding: "1px",
        cursor: "pointer",
    },
    todayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#fff1cbcf",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
        color: "#1c2b36",
    },
    notInThisMonthDayPaper5: {
        width: "35px",
        height: "35px",
        margin: "3px",
        padding: "1px",
        boxShadow: "none",
        // borderRadius: 0,
        backgroundColor: "#0000003d",
    },
    timezoneSelect:{
            // backgroundColor: "#223542",
            padding: "20px",
            margin: "20px auto",
            borderRadius: "5px",
            maxWidth: "600px",
            margin: "0 20px",
            fontWeight: 500,
            fontFamily: "tahoma",
            color:"black",
    },
}));

let ScoreChartTemplate = ({startDate,endDate}) => {


    // Generate data for chart
    let base = +new Date(2021, 1, 1);
    let oneDay = 24 * 3600 * 1000;
    let date = [];
    let data = [Math.random() * 300];
    for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    return {

        //Area Chart
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'left',
            text: 'Test Chart'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            min: startDate,
            max: endDate
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 10
            },
            {
                start: 0,
                end: 10
            }
          ],
          series: [
            {
              name: 'Test Data',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
              },
              data: data,
            }

          ]
    }
}

export default function CustomCalendar() {
    const classes = styles();
    const today = new Date();
    const sunnyDays = [1, 6, 10, 24, 15]
    const cloudyDays = [ 30, 4, 13,21]
    const snowyDays = [25,3,12,11,27]
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    // const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
        const isSunny = sunnyDays.includes(day.getDate());
        const isCloudy = cloudyDays.includes(day.getDate());
        const isSnow = snowyDays.includes(day.getDate());
        const isSelected = day.getDate() === selectedDate.getDate();
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
        console.log(day.getTime())
        let dateTile
        if (isInCurrentMonth) {
            if (isSunny) {
                dateTile = (
                    <Paper
                        className={
                            isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper
                        }
                    >
                        <Grid item>
                            <WbSunnyIcon style={{color: "orange"}}/>
                        </Grid>
                        <Grid item>
                            {day.getDate()}
                        </Grid>
                    </Paper>)
            } else if (isCloudy) {
                dateTile = (<Paper
                    className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                >
                    <Grid item>
                        <CloudIcon style={{color: "gray"}}/>

                    </Grid>
                    <Grid item> {day.getDate()}</Grid>
                </Paper>)
            } else if (isSnow) {
                dateTile = (
                    <Paper
                        className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                    >
                        <Grid item>
                            <AcUnitIcon style={{color: "#3d5afe"}}/>
                        </Grid>
                        <Grid item> {day.getDate()}</Grid>
                    </Paper>
                )
            } else {
                dateTile = (<Paper
                    className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                >
                    <Grid item>
                        <br/>
                    </Grid>
                    <Grid item> {day.getDate()}</Grid>
                </Paper>)
            }

        } else {
            dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
                <Grid item>
                    <br/>
                </Grid>
                <Grid item style={{color: "lightGrey"}}>
                    {day.getDate()}
                </Grid>
            </Paper>)
        }
        return dateTile
    }
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
          //e.stopPropagation();
          console.log("e.currentTarget;;",e.currentTarget)
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
  // const handleTimezone = () => {
  //   setOpen(false);
  // };
         console.log(selectedTimezone);
  
          const persianNumeral = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
          
    return (
        <div>
            <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
                <ThemeProvider theme={materialTheme}>
                    <DatePicker
                        label="Start"
                        value={startDate}
                        maxDate={today}
                        minDate="2019-01-01"
                        // inputVariant="outlined"
                        InputAdornmentProps={{ position: "start" }}
                        // format="MM/dd/yyyy"
                                format={localeFormatMap[locale]}
                                 cancelLabel={localeCancelLabelMap[locale]}
                                 okLabel={localeOkLabelMap[locale]}
                                 numberFormat={localeNumberFormatMap[locale]}
                                 localeSettingLabel={localeSettingLabelMap[locale]}


                        // views={["year", "month", "day"]}
                        // formatDate={(date) => moment(date).format('DD-MM-YYYY')}
                        onChange={(e) => {
                            // setStartDate(e.target.value)
                            setStartDate(dateFormat(e,"yyyy/m/d"))
                            }}
                        // variant="static"
                        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
                        
                    />
                    <DatePicker
                        label="End"
                        value={endDate}
                        maxDate={today}
                        minDate="2019-01-01"
                        // InputProps={{
                        //     endAdornment: (
                        //       <SvgIcon 
                        //         aria-label="Select locale"
                        //         onClick={handleMenuOpen}
                        //         aria-owns={anchorEl ? "locale-menu" : undefined}
                        //       >
                        //         <SettingsIcon />
                        //         </SvgIcon>
                        //     ),
                        //   }}
                          
                        // inputVariant="outlined"
                                format={localeFormatMap[locale]}
                                 cancelLabel={localeCancelLabelMap[locale]}
                                 okLabel={localeOkLabelMap[locale]}
                        onChange={(e) => {
                            // setEndDate(e.target.value)
                            setEndDate(dateFormat(e,"yyyy/m/d"))
                            }}
                        // variant="static"
                        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
                    />

                    <Button variant="outlined" color="blank" onClick={handleClickOpen}>
                    <SettingsIcon />
                    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Select locale"
        aria-describedby="Select locale"
      >
        <DialogTitle id="Select locale">{localeSettingLabelMap[locale]}</DialogTitle>
        <DialogContent
         position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
           <Tab label={localeLaunguageLabelMap[locale]} {...a11yProps(0)} /> 
          <Tab label={localeTimezoneLabelMap[locale]} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
        <input
          select
          value={localeLaunguageLabelMap[locale]}
          onClick={handleMenuOpen}
        />
        {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    //value={age}
    label="Age"
    onClick={handleMenuOpen}
  >
    <MenuItem value={10} onClick={handleMenuOpen}> 
    </MenuItem>
  </Select> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className={
         classes.timezoneSelect}>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        </div>
        </TabPanel>
          <DialogContentText id="alert-dialog-description">
          {/* <Button variant="outlined" color="primary" onClick={handleMenuOpen}>
          {localeLaunguageLabelMap[locale]}
      </Button>
      <Button variant="outlined" color="primary" onClick={handleMenuOpen}>
      {localeTimezoneLabelMap[locale]}
      <div className={
         classes.timezoneSelect}>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        </div>
      </Button> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          {localeCancelLabelMap[locale]}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
          {localeOkLabelMap[locale]}
          </Button>
        </DialogActions>
      </Dialog>

       {/* <Dialog> 
         <div className={
         classes.timezoneSelect}>
        <TimezoneSelect
          //value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        </div>
        </Dialog> */}
                    <Menu
                         id="locale-menu"
                         anchorEl={anchorEl}
                         open={Boolean(anchorEl)}
                         onClose={() => setAnchorEl(null)}
                         >
                        {Object.keys(localeMap).map(localeItem => (
                        <MenuItem
                            key={localeItem}
                            selected={localeItem === locale}
                            onClick={() => selectLocale(localeItem)}
                        >
                            {localeItem}
                        </MenuItem>
                        ))}
                    </Menu>
                 </ThemeProvider>
            </MuiPickersUtilsProvider>
            {/* Chart */}
            <ReactEcharts
                option={
                 ScoreChartTemplate({startDate,endDate})
                }
                 style={{ height: 500 , width:700}}
             />
        </div>
    ); 
}