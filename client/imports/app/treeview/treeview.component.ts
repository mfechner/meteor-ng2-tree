import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import template from "./treeview.component.html";
import style from "./treeview.component.scss";

import { TreeviewConfig } from "./treeviewconfig.model";

@Component({
    selector: "app-treeview",
    template,
    styles: [ style ]
})
export class TreeviewComponent implements OnInit, OnDestroy {
    @Input() subNodes: string[];
    @Input() dataService: any;
    @Input() config: TreeviewConfig = {};
    @Input() parentNode: any = {};
    @Input() position: number = 0;
    nodes: any[];
    icon: string;
    nodesSubscription: any;

    simpleDrop: any = null;

    constructor() {}

    ngOnInit() {
        this.icon = this.getIcon(null);
        this.nodesSubscription = this.dataService.getData(this.subNodes).subscribe(nodes => {
            this.checkAutoExpand(nodes);
            this.nodes = nodes;
        });
    }

    ngOnDestroy() {
        this.nodesSubscription.unsubscribe();
    }

    checkAutoExpand(nodes) {
        if(!this.config.collapsed) {
            nodes.forEach(el => {
                el.expanded=true;
            });
        }
    }

    toggle(node) {
        if(node.children && node.children.length > 0) {
            node.expanded = !node.expanded;
        }
        this.icon = this.getIcon(node);
    }

    getIcon(node) {
        if(node && node.children && node.children.length > 0) {
            if(node.expanded) {
                return "-";
            } else {
                return "+";
            }
        }
        return "";
    }

    handleDragOver(e){
        //console.log("Drag Over", e);
        if(e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter(e) {
        //this.classList.add('over');
        e.classList.add('over');

    }

    dragStart(e) {
        console.log("Drag start");
    }

    transferDataSuccess(event) {
        console.log("Drop completed with: ", event);
    }

    // Add a node directly under the ROOT_NODE
    addNodeOnRoot() {
        console.log("addNodeOnRoot");
        this.addNode({_id: "ROOT_NODE"});
    }

    // add a new node under the node the Add button was clicked
    addNode(node) {
        console.log("Add node", node, " on Parent", this.parentNode);
        // for testing lets create test dummy data
        let number = Math.random();
        let newId = "Test_" + number;

        this.dataService.insert({_id: newId, children: []});
        this.dataService.update({_id: node._id}, {$addToSet: {children: newId}});
    }

    removeNode(node, parentNode = this.parentNode) {
        console.log("Remove node", node, " on Parent", parentNode);

        if(!parentNode._id) {
            console.log("Remove ROOT_NODE problem");
            parentNode._id = "ROOT_NODE";
        }

        // check if we need to delete recursive
        if(node.children.length > 0) {
            node.children.forEach( idToDelete => {
                let followNodeToDelete = this.dataService.findOne({_id: idToDelete});
                console.log("Pass child to be deleted", followNodeToDelete);
                this.removeNode(followNodeToDelete, node);
            })
        }
        this.dataService.update({_id: parentNode._id}, {$pull: {children: node._id}});
        this.dataService.remove({_id: node._id});
    }

    public rearrangeNode(oldParentNode, newParentNode, node) {
        // if (oldParentNode == newParentNode) {
        // rearrange order under the same parent
        // db.categories.update({parentNode}, {$set: {"childs.1": 'LG', "childs.3": 'Other position'}})
        // } else {
        // Moving the node
        // db.categories.update({newParentNode}, {$addToSet: {children: "node._id"}})
        // db.categories.update({oldParentNode}, {$pull: {children: "node._id"}})
        // }
    }

    public getAllDescendants() {
        /*
         var decendants = [];
         var stack = [];
         var item = db.categories.findOne({_id: "Foo"});
         stack.push(item);
         while (stack.length > 0) {
         var currentNode = stack.pop();
         var children = db.categories.find({_id: {$in: currentNode.children}});

         while(true === children.hasNext()) {
         var child = children.next();
         descendants.push(child._id);
         if(child.children.length > 0) {
         stack.push(child);
         }
         }
         }
         descendants.join(",");
         */
    }

    public getPath(node) {
        /*
         var path = [];
         var item = db.categories.findOne(node);
         while ((item=db.categories.findOne({children: item._id}))) {
         path.push(item._id);
         }
         path.reverse().join(" / ");
         */
    }
}