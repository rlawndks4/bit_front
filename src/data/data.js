import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { defaultSettings } from 'src/components/settings/config-setting';
import { getLocalStorage } from 'src/utils/local-storage';

export const backUrl = process.env.BACK_URL;
export const logoSrc = () => {
  const { themeDnsData, themeMode } = useSettingsContext();
  let default_img = 'https://backend.comagain.kr/storage/images/logos/IFFUcyTPtgF887r0RPOGXZyLLPvp016Je17MENFT.svg';

  return themeDnsData[`${themeMode == 'dark' ? 'dark_' : ''}logo_img`]
};
export const KAKAO_OBJ = {
  BACKGROUND: '#F9E000',
  FONT_COLOR: '#371C1D'
}
export const LOCALSTORAGE = {
  DNS_DATA: "dns_data",
  USER_DATA: "user_data",
  CUR_ZOOM: "cur_zoom",
  IS_FULL_SCREEN: "is_full_screen",
  NOT_SEARCH_OPTION: "not_search_option",
  USER_APP_MEMBERSHIP_OBJ: "user_app_membership_obj"
}
export const zBottomMenu = [
  //{ name: `홈`, link: '/user/home', icon: <img src={defaultSettings.themeDnsData.logo_img} alt="#" style={{ height: '24px' }} />, className: 'master-dropdown-btn', allowLink: '/user/home' },
  { name: '서비스소개', link: '/user/service-info?type=0', icon: <Icon icon='mdi:map-marker-check-outline' style={{ fontSize: '24px' }} />, className: '', allowLink: '/user/service-info' },
  { name: '연동형API', link: '/user/api?type=0', icon: <Icon icon='mdi:comment-question-outline' style={{ fontSize: '24px' }} />, className: '', allowLink: '/user/api' },
  { name: '고객센터', link: '/user/help', icon: <Icon icon='clarity:chat-bubble-line' style={{ fontSize: '24px' }} />, className: '', allowLink: '/user/help' },
];
export const zTabMenu = {
  'service-info': [
    {
      title: '문자',
    },
    {
      title: '선거문자',
    },
    {
      title: '알림톡',
    },
    {
      title: '친구톡',
    },
  ],
  'api': [
    {
      title: '문자API',
      banner: {
        title: '문자 발송 RESTful API',
        sub_title: '별도의 신청절차 없이 회원가입만 하면 바로 연동하실 수 있습니다.',
        button_text: '지금바로 서버 연동하기',
        button_link: '#'
      }
    },
    {
      title: '알림톡API',
      banner: {
        title: '알림톡 발송 RESTful API',
        sub_title: '별도의 신청절차 없이 카카오채널 계정 연동만 하면 바로 사용하실 수 있습니다.',
        button_text: '지금바로 서버 연동하기',
        button_link: '#'
      }
    },
    {
      title: '친구톡API',
      banner: {
        title: '친구톡 발송 RESTful API',
        sub_title: '별도의 신청절차 없이 카카오채널 계정 연동만 하면 바로 사용하실 수 있습니다.',
        button_text: '지금바로 서버 연동하기',
        button_link: '#'
      }
    },
  ],
  'help': [
    {
      title: '문의하기',
    },
    {
      title: '기능요청',
    },
    {
      title: '문의내역',
    },
  ]
}
export const sendFormObj = {
  msg: {

    req_colums: [
      { title: '키' },
      { title: '설명' },
      { title: '필수' },
      { title: '타입' },
    ],
    req_list: [
      ['key', '인증용 API Key', 'O', 'String'],
      ['user_id', '사용자id', 'O', 'String'],
      ['sender', '발신자 전화번호 (최대 16bytes)', 'O', 'String'],
      ['receiver', '수신자 전화번호 - 컴마(,)분기 입력으로 최대 1천명', 'O', 'String'],
      ['msg', '메시지 내용', 'O', 'String (1~2,000Byte)'],
      ['image1', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
      ['image2', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
      ['image3', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
    ],
    res_colums: [

    ],
    res_list: [

    ],
  },
  alimtalk: {
    req_colums: [

    ],
    req_list: [

    ],
    res_colums: [

    ],
    res_list: [

    ],
  },
  friendtalk: {
    req_colums: [

    ],
    req_list: [

    ],
    res_colums: [

    ],
    res_list: [

    ],
  },
}

export const post_category_list = [
  '후기',
  '공지사항',
  '업장정보소개'
]