import { Component, OnInit, OnDestroy } from '@angular/core';
import * as logistics from '../../../logistics/logistics.module';
import { Router, NavigationEnd } from '@angular/router';
import { SessionService } from '../../../../share/services/session.service';
import { RxjsMessageService } from 'src/app/share/services/rxjsMessage.service';
import { debug } from 'util';
import { FrontService } from '../../../../share/restServices/front.service';
import { NzModalService } from 'ng-zorro-antd';
import { ReportsComponent } from '../reports/reports.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
    providers: []
})
export class MenuComponent implements OnInit, OnDestroy {
    friendLink: Array<{ name: string; link: string }> = [];
    heightClass = {};
    menuLocation = true;
    childrenShowKey = true;
    menu = [];
    collectKey = false;
    hardImg = '';
    userName = this.sessionService.getItem('userName');
    token = this.sessionService.getItem('token');
    subscription;
    // 有子菜单的需要引入
    routesMenu = [
        {
            name: '后勤保障',
            children: logistics.routes
        }
    ];
    rightDown = [
        {
            value: 'my',
            label: '个人中心',
        },
        {
            value: 'exit',
            label: '退出',
        }
    ];

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private frontService: FrontService,
        private modalService: NzModalService,
        private rxjsMessageService: RxjsMessageService) {
    }

    ngOnInit() {
        this.gaodu();
        this.getLinked();
        let userType = [1001];
        // 如果没有用户类型，说明没有登录，直接跳转登录页面
        if (!this.sessionService.getItem('roles')) {
            // this.router.navigate(['/']);
            // return;
        } else {
            this.hardImg = this.sessionService.getItem('hardImg');
            userType = this.sessionService.getItem('roles').split(',').map(item => {
                return Number(item);
            });
        }
        let adminList = {};
        this.router.config.forEach(item => {
            if (item.path === 'admin' || item.path == '') {
                adminList = item['_loadedConfig'].routes[0];
            }
        });
        adminList['children'].every(item => {
            if (item.data.roles && item.data.roles.length) {
                let key = false;
                item.data.roles.forEach(ob1 => {
                    userType.forEach(ob2 => {
                        if (ob1 == ob2) {
                            key = true;
                        }
                    });
                });
                if (!key) {
                    return true;
                }
            }
            if (item.data && (item.data as any).menu) {
                const itemMenu = {
                    path: item.path, name: (item.data as any).name,
                    children: [], data: item.data
                };
                this.routesMenu.forEach(subItem => {
                    if ((item.data as any).name == subItem['name']) {
                        (subItem as any).children.forEach(subSubItem => {
                            if (subSubItem.data && subSubItem.data.menu) {
                                if (subSubItem.data.roles && subSubItem.data.roles.length) {
                                    let key = false;
                                    subSubItem.data.roles.forEach(ob1 => {
                                        if (ob1 == userType) {
                                            key = true;
                                        }
                                    });
                                    if (!key) {
                                        return;
                                    }
                                }
                                itemMenu.children.push({
                                    path: item.path + '/' + subSubItem.path,
                                    name: subSubItem.data.name
                                });
                            }
                        });
                    }
                });
                this.menu.push(itemMenu);
                return true;
            }
            return true;
        });
        this.setActiveMenu(this.router.url, '');

        this.subscription = this.rxjsMessageService.getMessage()
            .subscribe(message => {
                if (message.type === 'login') {
                    this.userName = message.data.userInfoVO.userName;
                    this.token = '344';
                }

            });

        this.router.events
            .subscribe((event) => {
                // example: NavigationStart, RoutesRecognized, NavigationEnd
                if (event instanceof NavigationEnd) {
                    this.setActiveMenu(event.url, '');
                }
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    downChange(data) {
        switch (data.value) {
            case 'my': {
                this.router.navigate(['/self']);
                break;
            }
            case 'exit': {
                this.userName = '';
                this.token = '';
                this.sessionService.removeItem('token');
                // this.sessionService.removeItem('userName');
                // this.sessionService.removeItem('userInfoVo');
                // this.sessionService.removeItem('id');
                // this.sessionService.removeItem('password');
                this.router.navigate(['/']);
                this.rxjsMessageService.sendMessage({
                    type: 'exit',
                    data: data.data
                });
                break;
            }
        }
    }

    // 设置菜单选中
    setActiveMenu(url, br) {
        this.menu.forEach(item => {
            item.children.forEach(subItem => {
                if (br + subItem.path === url) {
                    subItem.active = true;
                } else {
                    subItem.active = false;
                }
            });

            if (url === '/' && item.path === '') {
                item.active = true;
            } else if (item.path !== '' && url.indexOf(item.path) !== -1) {
                item.active = true;
                if (this.menuLocation) {
                    item.show = true;
                }
            } else {
                item.active = false;
            }
        });
        if (url.indexOf('/admin/collect') !== -1) {
            this.collectKey = true;
        }
    }

    goMenu(item) {
        this.router.navigateByUrl('/admin/' + item.path);
    }

    bigMenu(item) {
        if (!item.children.length) {
            this.router.navigateByUrl('/admin/' + item.path + (item.data.hideChild ? '/index' : ''));
        }
        item.show = !item.show;
    }

    bigMenuTop(item) {
        this.collectKey = false;
        if (!item.children.length) {
            this.router.navigateByUrl('/' + item.path + (item.data.hideChild ? '/index' : ''));
        }
    }

    goMenuTop(item) {
        this.childrenShowKey = false;
        this.menu.forEach((item1, i) => {
            item1.show = false;
        });
        if (item.path.charAt(item.path.length - 1) === '/') {
            item.path = item.path.substr(0, item.path.length - 1);
        }
        this.router.navigateByUrl('/' + item.path);
        setTimeout(() => {
            this.childrenShowKey = true;
        }, 100);
    }

    gaodu() {
        window.setInterval(() => {
            const clientHeight = (document.body.clientHeight - 460) + 'px';
            this.heightClass = { 'min-height': clientHeight };
        }, 500);
    }

    getLinked() {
        this.frontService.getLinked({
            params: {
                pageNumber: 1,
                pageSize: 4
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    const data = response.data.pageData;
                    for (let index = 0; index < data.length; index++) {
                        this.friendLink.push({ name: data[index].name, link: data[index].link });
                    }
                }
            });
    }
    gun(a) {
        if (a.index('http') !== -1) {
            window.open(a);
        } else {
            // window.open('http://' + a);
        }
    }
    gengduogun() {
        this.router.navigate(['link']);
    }
    reports(): void {
        const tplModal = this.modalService.create({
            nzTitle: '投诉举报',
            nzContent: ReportsComponent,
            nzFooter: null,
            nzMaskClosable: false,
            nzClosable: false,
            nzOnOk: () => console.log('Click ok')
        });
    }
}
