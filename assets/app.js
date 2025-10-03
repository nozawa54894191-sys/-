'use strict';

/** バージョン情報（キャッシュバスター用に index.html でも使用） */
const APP_VERSION = '1.0.0';

/** ▼▼ 2025 地域別最低賃金データ（例） ▼▼ */
const MW2025 = {
  "北海道": { new:1075, prev:1010, effective:"2025-10-04" },
  "青森県": { new:1029, prev:953 , effective:"2025-11-21" },
  "岩手県": { new:1031, prev:952 , effective:"2025-12-01" },
  "宮城県": { new:1038, prev:973 , effective:"2025-10-04" },
  "秋田県": { new:1031, prev:951 , effective:"2026-03-31" },
  "山形県": { new:1032, prev:955 , effective:"2025-12-23" },
  "福島県": { new:1033, prev:955 , effective:"2026-01-01" },
  "茨城県": { new:1074, prev:1005, effective:"2025-10-12" },
  "栃木県": { new:1068, prev:1004, effective:"2025-10-01" },
  "群馬県": { new:1063, prev:985 , effective:"2026-03-01" },
  "埼玉県": { new:1141, prev:1078, effective:"2025-11-01" },
  "千葉県": { new:1140, prev:1076, effective:"2025-10-03" },
  "東京都": { new:1226, prev:1163, effective:"2025-10-03" },
  "神奈川県": { new:1225, prev:1162, effective:"2025-10-04" },
  "新潟県": { new:1050, prev:985 , effective:"2025-10-02" },
  "富山県": { new:1062, prev:998 , effective:"2025-10-12" },
  "石川県": { new:1054, prev:984 , effective:"2025-10-08" },
  "福井県": { new:1053, prev:984 , effective:"2025-10-08" },
  "山梨県": { new:1052, prev:988 , effective:"2025-12-01" },
  "長野県": { new:1061, prev:998 , effective:"2025-10-03" },
  "岐阜県": { new:1065, prev:1001, effective:"2025-10-18" },
  "静岡県": { new:1097, prev:1034, effective:"2025-11-01" },
  "愛知県": { new:1140, prev:1077, effective:"2025-10-18" },
  "三重県": { new:1087, prev:1023, effective:"2025-11-21" },
  "滋賀県": { new:1080, prev:1017, effective:"2025-10-05" },
  "京都府": { new:1122, prev:1058, effective:"2025-11-21" },
  "大阪府": { new:1177, prev:1114, effective:"2025-10-16" },
  "兵庫県": { new:1116, prev:1052, effective:"2025-10-04" },
  "奈良県": { new:1051, prev:986 , effective:"2025-11-16" },
  "和歌山県": { new:1045, prev:980 , effective:"2025-11-01" },
  "鳥取県": { new:1030, prev:957 , effective:"2025-10-04" },
  "島根県": { new:1033, prev:962 , effective:"2025-11-17" },
  "岡山県": { new:1047, prev:982 , effective:"2025-12-01" },
  "広島県": { new:1085, prev:1020, effective:"2025-11-01" },
  "山口県": { new:1043, prev:979 , effective:"2025-10-16" },
  "徳島県": { new:1046, prev:980 , effective:"2026-01-01" },
  "香川県": { new:1036, prev:970 , effective:"2025-10-18" },
  "愛媛県": { new:1033, prev:956 , effective:"2025-12-01" },
  "高知県": { new:1023, prev:952 , effective:"2025-12-01" },
  "福岡県": { new:1057, prev:992 , effective:"2025-11-16" },
  "佐賀県": { new:1030, prev:956 , effective:"2025-11-21" },
  "長崎県": { new:1031, prev:953 , effective:"2025-12-01" },
  "熊本県": { new:1034, prev:952 , effective:"2026-01-01" },
  "大分県": { new:1035, prev:954 , effective:"2026-01-01" },
  "宮崎県": { new:1023, prev:952 , effective:"2025-11-16" },
  "鹿児島県": { new:1026, prev:953 , effective:"2025-11-01" },
  "沖縄県": { new:1023, prev:952 , effective:"2025-12-01" }
};

/** ▼▼ 厚労省公表順（北海道→沖縄） ▼▼ */
const PREF_ORDER_MHLW = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県",
  "岐阜県","静岡県","愛知県","三重県",
  "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
];

/** ▼▼ 要素参照 ▼▼ */
const $ = (id) => document.getElementById(id);
const prefSel = $('pref');
const payType = $('payType');
const amount = $('amount');

const blockHourly = $('block-hourly');
const blockDaily  = $('block-daily');
const blockMonthly= $('block-monthly');
const mModeSelect = $('mModeSelect');
const mTotal = $('m-total');
const mCompose = $('m-compose');

const dailyHours = $('dailyHours');
const monthlyTotal = $('monthlyTotal');
const workDays = $('workDays');
const hoursPerDay = $('hoursPerDay');

const hasFOT = $('hasFOT');
const fotAmount = $('fotAmount');
const fotHours = $('fotHours');

const judgeBadge = $('judgeBadge');
const hourlyOut = $('hourlyOut');
const mwOut = $('mwOut');
const mwNote = $('mwNote');
const mwFutureRow = $('mwFutureRow');
const mwEffDate = $('mwEffDate');
const mwFuture = $('mwFuture');
const deltaRow = $('deltaRow');
const deltaOut = $('deltaOut');
const fotCheckRow = $('fotCheckRow');
const fotCheckText = $('fotCheckText');

let TODAY_STR = null;

/** 初期化 */
document.addEventListener('DOMContentLoaded', () => {
  // 都道府県セレクト：厚労省順で追加
  PREF_ORDER_MHLW.forEach(p=>{
    if (MW2025[p]) {
      const o=document.createElement('option');
      o.value=p; o.textContent=p; prefSel.appendChild(o);
    }
  });
  // 今日（YYYY-MM-DD）
  const t=new Date(); const pad=n=>String(n).padStart(2,'0');
  TODAY_STR=`${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`;

  // 初期表示
  switchPayType();

  // 月給方式プルダウン → 選択後に該当欄のみ表示
  mModeSelect.addEventListener('change', onMonthlyModeChange);

  // 固定残業の有無で活性/非活性
  hasFOT.addEventListener('change', ()=>{
    const on = hasFOT.value==='yes';
    [fotAmount,fotHours].forEach(el=>{ el.disabled=!on; if(!on){ el.value=''; }});
  });

  // Enterで計算
  document.addEventListener('keydown', e => { if (e.key==='Enter'){ e.preventDefault(); calc(); }});

  // ボタン
  $('calcBtn').addEventListener('click', calc);

  // 一覧テーブル描画（厚労省順）
  renderMWTable();
});

function onMonthlyModeChange(){
  const v = mModeSelect.value;
  if (v==='total'){ mTotal.classList.remove('hide'); mCompose.classList.add('hide'); }
  else if (v==='compose'){ mTotal.classList.add('hide'); mCompose.classList.remove('hide'); }
  else { mTotal.classList.add('hide'); mCompose.classList.add('hide'); }
}

payType.addEventListener('change', switchPayType);
function switchPayType(){
  blockHourly.hidden = blockDaily.hidden = blockMonthly.hidden = true;
  if (payType.value==='hourly'){ blockHourly.hidden=false; }
  if (payType.value==='daily'){  blockDaily.hidden=false; }
  if (payType.value==='monthly'){
    blockMonthly.hidden=false;
    // 方式を未選択に戻し、入力欄は非表示へ
    mModeSelect.value='';
    onMonthlyModeChange();
    // 固定残業欄初期化
    hasFOT.value='no'; [fotAmount,fotHours].forEach(el=>{ el.disabled=true; el.value=''; });
  } else {
    hasFOT.value='no'; [fotAmount,fotHours].forEach(el=>{ el.disabled=true; el.value=''; });
  }
}

function parseNum(v){ const n=Number(v); return isFinite(n)? n : NaN; }

function getApplicableMW(pref){
  const rec = MW2025[pref]; if(!rec) return null;
  const d=new Date(TODAY_STR+'T00:00:00'); const eff=new Date(rec.effective+'T00:00:00');
  const usePrev = d < eff;
  return {
    value: usePrev ? rec.prev : rec.new,
    label: usePrev ? `（改定前額／発効日 ${rec.effective} 以前）` : `（新額／発効日 ${rec.effective} 以後）`,
    effective: rec.effective,
    isPrev: usePrev,
    newVal: rec.new
  };
}

function calc(){
  const pref = prefSel.value;
  const ptype = payType.value;
  const amt = parseNum(amount.value);

  if(!pref || !(amt>0)){
    alert('都道府県／給与額を正しく入力してください。'); return;
  }

  let hourly = NaN; // 最低賃金と比較する「時給（比較対象時給）」

  if (ptype==='hourly'){
    hourly = amt;
  } else if (ptype==='daily'){
    const h = parseNum(dailyHours.value);
    if(!(h>0)){ alert('日給の場合、1日の実働時間（h）を入力してください。'); return; }
    hourly = amt / h;
  } else if (ptype==='monthly'){
    const mode = mModeSelect.value;
    if(!mode){ alert('月給の場合、先に「勤務時間方式」を選択してください。'); return; }

    let schedHours = NaN;
    if (mode==='total'){
      const total = parseNum(monthlyTotal.value);
      if(!(total>0)){ alert('月給（総労働時間）を入力してください。'); return; }
      schedHours = total;
    } else {
      const days = parseNum(workDays.value);
      const hpd  = parseNum(hoursPerDay.value);
      if(!(days>0) || !(hpd>0)){ alert('勤務日数と1日の実働時間を入力してください。'); return; }
      schedHours = days * hpd;
    }

    // 固定残業代がある場合は基礎賃金ベースで比較対象時給を算出
    if (hasFOT.value==='yes'){
      const fotAmt = parseNum(fotAmount.value);
      const fotHrs = parseNum(fotHours.value);
      if(!(fotAmt>=0) || !(fotHrs>0)){
        alert('固定残業代の金額と固定残業時間（h/月）を正しく入力してください（時間は0より大）。'); return;
      }
      const basePay = amt - fotAmt;
      if(!(basePay>0)){
        alert('固定残業代が月給額以上になっています。内訳を見直してください。'); return;
      }
      hourly = basePay / schedHours; // 基礎賃金ベース
    } else {
      hourly = amt / schedHours;
    }
  }

  const mw = getApplicableMW(pref);
  if(!mw){ alert('最低賃金データが見つかりません。'); return; }

  const hourlyRounded = Math.round(hourly*100)/100;
  const diff = Math.round((hourly - mw.value)*100)/100;

  hourlyOut.textContent = hourlyRounded.toLocaleString();
  mwOut.textContent = mw.value.toLocaleString();
  mwNote.textContent = ` ${mw.label}`;
  deltaOut.textContent = diff.toLocaleString();
  deltaRow.classList.remove('hide');

  judgeBadge.className = 'badge'; // reset
  if (hourly >= mw.value){
    judgeBadge.textContent = '✅ 最低賃金以上';
    judgeBadge.classList.add('ok','badge');
  } else {
    judgeBadge.textContent = '⛔ 最低賃金割れ';
    judgeBadge.classList.add('ng','badge');
  }

  // 改定前の場合の併記（改定日と改定後額）
  if (mw.isPrev){
    mwEffDate.textContent = mw.effective;
    mwFuture.textContent = mw.newVal.toLocaleString();
    mwFutureRow.classList.remove('hide');
  } else {
    mwFutureRow.classList.add('hide');
  }

  // 固定残業（時給基準）のチェック表示：月給かつ「含む」の時のみ
  fotCheckRow.classList.add('hide');
  if (ptype==='monthly' && hasFOT.value==='yes'){
    const fotAmt = parseNum(fotAmount.value);
    const fotHrs = parseNum(fotHours.value);
    if (fotHrs>0){
      const fotHourly = Math.round((fotAmt / fotHrs) * 100) / 100;   // 固定残業〈時給〉
      const reqHourly = Math.round((mw.value * 1.25) * 100) / 100;    // 基準＝最低賃金×1.25
      const ok = fotHourly >= reqHourly;
      const line1 = `固定残業〈時給〉: ${fotHourly.toLocaleString()} 円/h`;
      const line2 = `判定基準（最低賃金×1.25）: ${reqHourly.toLocaleString()} 円/h`;
      const line3 = ok
        ? '→ 固定残業の時給が基準を満たしています。'
        : '→ 固定残業の時給が基準を下回っています。見直しを検討してください。';
      fotCheckText.innerHTML = `${line1}<br>${line2}<br><strong>${line3}</strong>`;
      fotCheckRow.classList.remove('hide');
    }
  }
}

/** 一覧テーブル描画（厚労省順） */
function renderMWTable(){
  const tbody = document.querySelector('#mwTable tbody');
  tbody.innerHTML = '';
  PREF_ORDER_MHLW.forEach(p=>{
    const rec = MW2025[p];
    if (!rec) return;
    const tr = document.createElement('tr');
    const min = rec.new;                    // 2025新額
    const premium = Math.round(min * 1.25); // 割増賃金額＝最低賃金×1.25
    tr.innerHTML = `
      <td>${p}</td>
      <td class="mono">${min.toLocaleString()} 円</td>
      <td class="mono">${premium.toLocaleString()} 円</td>
      <td class="mono">${rec.effective}</td>
    `;
    tbody.appendChild(tr);
  });
}
