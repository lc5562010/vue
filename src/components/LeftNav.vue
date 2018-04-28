<template>
    <div class="leftNav">
        <Menu :theme="theme" active-name="1-1" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    运营管理
                </template>
                <MenuItem name="1-1">
                    <router-link to="/Space">空间信息管理</router-link>
                </MenuItem>
                <MenuItem name="1-2">
                    <router-link to="/Station">工位管理</router-link>
                </MenuItem>
                <!-- <MenuItem name="1-3">会议室管理</MenuItem>
                <MenuItem name="1-1">场地管理</MenuItem>
                <MenuItem name="1-2">工位管理</MenuItem>
                <MenuItem name="1-3">会议室管理</MenuItem> -->
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户管理
                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
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

