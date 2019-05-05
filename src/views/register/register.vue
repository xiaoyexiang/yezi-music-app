<template>
  <div class="register-wrapper">
    <cube-form :model="model" :schema="schema" @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        phone: "",
        password: ""
      },
      schema: {
        fields: [
          // 手机号配置
          {
            type: "input",
            modelKey: "phone",
            label: "",
            props: {
              placeholder: "请输入手机号",
              type: "number"
            },
            rules: {
              //校验规则
              required: true,
              min: 11,
              max: 11
            },
            trigger: "blur", //失焦
            messages: {
              min: "请正确填写手机号码",
              max: "请正确填写手机号码"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "",
            props: {
              placeholder: "设置登录密码, 不小于6位",
              type: "password", //输入密码时，显示成小圆点
              eye: {
                open: false //密码不可见
              }
            },
            rules: {
              required: true,
              min: 6
            },
            trigger: "blur",
            messages: {
              required: "密码不能为空",
              min: "密码不能小于6位"
            }
          },
          {
            type: "submit",
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
    }
  },
  created() {}
};
</script>
