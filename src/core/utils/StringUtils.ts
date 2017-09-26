class StringUtils extends BaseClass{
        private _htmlTextParser: egret.HtmlTextParser;

        public formatToTime(time: number): string {
            let h = App.NumberUtils.parseInt(time / 3600);
            let m = App.NumberUtils.parseInt(time % 3600 / 60);
            let s = App.NumberUtils.parseInt(time % 3600 % 60);

            return h + ":" + m + ":" + s;
        }

        public formatToOpretor(time: number): string {
            let m = Math.floor(time % 3600 / 60);
            let s = time % 3600 % 60;
            let mm = m > 9 ? m : "0" + m;
            let ss = s > 9 ? s : "0" + s;
            return mm + "  " + ss;
        }

        public getRemainTimeTextByEndTime(endTime: number): string {
            let timeStr = "";
            let nowTime = App.NumberUtils.parseInt(new Date().getTime() / 1000);
            let remainTime = endTime - nowTime + App.GlobalData.serverTimeDifference;//加上前后端时间差值

            let days = App.NumberUtils.parseInt(remainTime / (24 * 3600));

            if (days < 1) {
                timeStr = App.StringUtils.formatToTime(remainTime);
            } else {
                let h = App.NumberUtils.parseInt(remainTime / 3600) % 24;
                timeStr = `${days}天${h}小时`;
            }

            return timeStr;
        }

        public getTextFlowByHtml(htmlText: string): egret.ITextElement[] {
            if (App.StringUtils._htmlTextParser == null) {
                App.StringUtils._htmlTextParser = new egret.HtmlTextParser();
            }
            return App.StringUtils._htmlTextParser.parse(htmlText);
        }

        /**
         * 去掉前后空格
         */
        public trimSpace(str: string): string {
            return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
        }

        /**
         * 获取字符串长度，中文为2
         */
        public getStringLength(str: string): number {
            let strArr = str.split("");
            let length = 0;
            for (let i = 0; i < strArr.length; i++) {
                let s = strArr[i];
                if (this.isChinese(s)) {
                    length += 2;
                } else {
                    length += 1;
                }
            }
            return length;
        }

        /**
         * 判断一个字符串是否包含中文
         */
        public isChinese(str: string): boolean {
            let reg = /^.*[\u4E00-\u9FA5]+.*$/;
            return reg.test(str);
        }
}