<template>
  <div class="login-wrapper">
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
            label: "+86",
            props: {
              placeholder: "请输入手机号"
            },
            rules: {
              //校验规则
              required: true
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password", //输入密码时，显示成小圆点
              eye: {
                open: false //密码不可见
              }
            },
            rules: {
              required: true,
              min: 3,
              max: 15
            },
            trigger: "blur", //
            messages: {
              required: "密码不能为空"
            }
          },
          {
            type: "submit",
            label: "登录"
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
