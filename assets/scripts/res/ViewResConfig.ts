import UIConstant from "../constant/UIConstant";  
import BuySeedView from "../view/BuySeedView/BuySeedView";
import AlertDialog from "../view/dialog/AlertDialog";
import ToastTip from "../view/dialog/ToastTip";  
import SeedShopView from "../view/SeedShopView/SeedShopView";
import FruitBagView from "../view/FruitBagView/FruitBagView"
import FruitRecordView from "../view/FruitRecordView/FruitRecordView"
import PigAttackView from "../view/PigAttackView/PigAttackView"
import UserInfoView from "../view/UserInfoView/UserInfoView";
import CoinRecordView from "../view/CoinRecordView/CoinRecordView";
import GiftRecordView from "../view/GiftRecordView/GiftRecordView";
import StrategyView from "../view/StrategyView/StrategyView";
import RechargeView from "../view/RechargeView/RechargeView";
import AllAlertView from "../view/AllAlertView/AllAlertView";
import ConvertView from "../view/ConvertView/ConvertView";
import UserLevelView from "../view/UserLevelView/UserLevelView";
import NewPeopleView from   "../view/NewPeopleView/NewPeopleView"
import SignView from "../view/SignView/SignView";
import UpgradeView from '../view/UpgradeView/UpgradeView'
import FishBagView from "../view/FishBagView/FishBagView";
import VipPopupView from "../view/VipPopupView/VipPopupView";
import FruitRankView from "../view/FruitRankView/FruitRankView";
import TodaySignView from "../view/TodaySignView/TodaySignView";
import SettingView from "../view/SettingView/SettingView";
import PetLevelView from "../view/PetLevelView/PetLevelView";
import MallTipView from "../view/MallTipView/MallTipView";
import DrawView from "../view/DrawView/DrawView";
import UpdateView from "../update/UpdateView";
import DrawRecordView from "../view/DrawRecordView/DrawRecordView";


/**
 * 视图资源依赖配置
 */
export default class ViewResConfig {
    public static config = {
        "MainScene": {
            group: ["MainScene"],
        },
        "ToastTip": {
            group: "toasttip",
            uiComponent: ToastTip
        },
        [UIConstant.AlertDialog]: {
            url: "prefabs/common/AlertDialog",
            uiComponent: AlertDialog,
        },
        [UIConstant.ToastTip]: {
            url: "prefabs/common/ToastTip",
            uiComponent: ToastTip,
        }, 
        /**喂养弹窗 */
        [UIConstant.SeedShopView]: {
            url: "prefabs/view/SeedShopView",
            uiComponent: SeedShopView,
        }, 

        [UIConstant.FruitBagView]: {
            url: "prefabs/view/FruitBagView",
            uiComponent: FruitBagView,
        }, 
        [UIConstant.FruitRecordView]: {
            url: "prefabs/view/FruitRecordView",
            uiComponent: FruitRecordView,
        }, 
        [UIConstant.PigAttackView]: {
            url: "prefabs/view/PigAttackView",
            uiComponent: PigAttackView,
        }, 
		/**购买弹窗 */
        [UIConstant.BuySeedView]: {
            url: "prefabs/view/BuySeedView",
            uiComponent: BuySeedView,
        }, 
        /* 个人信息 */
        [UIConstant.UserInfoView]: {
            url: "prefabs/view/UserInfoView",
            uiComponent: UserInfoView,
        }, 
        /* 金币记录 */
        [UIConstant.CoinRecordView]: {
            url: "prefabs/view/CoinRecordView",
            uiComponent: CoinRecordView,
        }, 
        /* 礼券记录 */
        [UIConstant.GiftRecordView]: {
            url: "prefabs/view/GiftRecordView",
            uiComponent: GiftRecordView,
        }, 
        /* 攻略 */
        [UIConstant.StrategyView]: {
            url: "prefabs/view/StrategyView",
            uiComponent: StrategyView,
        }, 
        /* 充值 */
        [UIConstant.RechargeView]: {
            url: "prefabs/view/RechargeView",
            uiComponent: RechargeView,
        }, 
        /* 兑换 */
        [UIConstant.ConvertView]: {
            url: "prefabs/view/ConvertView",
            uiComponent: ConvertView,
        }, 
        /**等级 */
        [UIConstant.UserLevelView]: {
            url: "prefabs/view/UserLevelView",
            uiComponent: UserLevelView,
        }, 
        /**新人 */
        [UIConstant.NewPeopleView]: {
            url: "prefabs/view/NewPeopleView",
            uiComponent: NewPeopleView,
        }, 
        /**签到 */
        [UIConstant.SignView]: {
            url: "prefabs/view/SignView",
            uiComponent: SignView,
        }, 
        /* 升级 */
        [UIConstant.UpgradeView]: {
            url: "prefabs/view/UpgradeView",
            uiComponent: UpgradeView,
        }, 
        /* 鱼干背包 */
        [UIConstant.FishBagView]: {
            url: "prefabs/view/FishBagView",
            uiComponent: FishBagView,
        }, 
        /* VIP */
        [UIConstant.VipPopupView]: {
            url: "prefabs/view/VipPopupView",
            uiComponent: VipPopupView,
        }, 
        /* Rank */
        [UIConstant.DrawView]: {
            url: "prefabs/view/DrawView",
            uiComponent: DrawView,
        }, 
        /* draw */
        [UIConstant.FruitRankView]: {
            url: "prefabs/view/FruitRankView",
            uiComponent: FruitRankView,
        }, 
        /* TodaySignView */
        [UIConstant.TodaySignView]: {
            url: "prefabs/view/TodaySignView",
            uiComponent: TodaySignView,
        }, 
        /* SettingView */
        [UIConstant.SettingView]: {
            url: "prefabs/view/SettingView",
            uiComponent: SettingView,
        }, 
        /* PetLevelView */
        [UIConstant.PetLevelView]: {
            url: "prefabs/view/PetLevelView",
            uiComponent: PetLevelView, 
        }, 
        /* PetLevelView */
        [UIConstant.DrawRecordView]: {
            url: "prefabs/view/DrawRecordView",
            uiComponent: DrawRecordView, 
        }, 
        /** */
        [UIConstant.AllAlertView]: {
            url: "prefabs/view/AllAlertView",
            uiComponent: AllAlertView,
        },
        /** */
        [UIConstant.MallTipView]: {
            url: "prefabs/common/MallTip",
            uiComponent: MallTipView,
        },

        [UIConstant.UpdateView]: {
            url: "prefabs/view/UpdateView",
            uiComponent: UpdateView,
        },
    }
}