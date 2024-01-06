
export const react_quill_data = {
  modules: {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  },
  formats: [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color'
  ]
}

export const defaultManagerObj = {
  brands: {
    name: '',
    dns: '',
    og_description: '',
    company_name: '',
    pvcy_rep_name: '',
    ceo_name: '',
    addr: '',
    addr_detail: '',
    resident_num: '',
    business_num: '',
    phone_num: '',
    fax_num: '',
    note: '',
    youtube_link: '',
    blog_link: '',
    kakao_link: '',
    phone_link: '',
    logo_file: undefined,
    dark_logo_file: undefined,
    favicon_file: undefined,
    og_file: undefined,
    info_banner_file: undefined,
    program_info_banner_file: undefined,
    guide_banner_file: undefined,
    post_2_banner_file: undefined,
    post_3_banner_file: undefined,
    setting_obj: {
      tutorial_num: 0,
      shop_demo_num: 1,
      sms: 10,
      lms: 36,
      mms: 50,
      at: 10,
      ai: 30,
    },
    theme_css: {
      main_color: '#00ab55'
    },
    bizppurio_obj: {
      sms: 0,
      lms: 0,
      mms: 0,
      at: 0,
      ai: 0,
    }
  },
  products: {
    product_file: undefined,
    product_banner_file: undefined,
    name: '',
    price: 0,
    note: '',
  },
}
