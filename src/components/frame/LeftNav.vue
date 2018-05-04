<template>
    <div class="leftNav">
        <Menu :theme="theme" active-name="1-1" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    门锁管理
                </template>
                <MenuItem name="1-1">
                    <router-link to="/Lock">设备管理</router-link>
                </MenuItem>
                <MenuItem name="1-2">
                    <router-link to="/person">人员管理</router-link>
                </MenuItem>
                <MenuItem name="1-3">
                    <router-link to="/Power">权限管理</router-link>
                </MenuItem>
                <MenuItem name="1-4">
                    <router-link to="/History">历史记录</router-link>
                </MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: 'LeftNav',
        data () {
            return {
                theme: 'dark'
            }
        }
    }
</script>

<style lang="less" scoped>
    .leftNav {
        float: left;
        background: #495060;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 65px;
        a {
            color: #FFF;
        }
    }
</style>

