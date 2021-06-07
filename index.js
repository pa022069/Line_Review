const lineReviwe = function () {
  const wrap = document.querySelector(".phone__container");

  const createText = (_data, _role) => {
    wrap.insertAdjacentHTML('beforeend',
      `
      <div class="messageGroup__group ${_role === 1 && "messageGroup__user"}">
        <div class="messageGroup__avatar" style="background-image: url(.${_data.botSender.botSenderIconUrl}"></div>
        <div class="messageGroup__content">
          <div class="type__text">
            <p>${_data.content}</p>
          </div>
          <div class="type__time">
            <p>上午 23:59</p>
          </div>
        </div>
      </div>
    `
    );
  };

  const createVideo = (_data, _role) => {
    wrap.insertAdjacentHTML('beforeend',
      `
      <div class="messageGroup__group ${_role === 1 && "messageGroup__user"}">
        <div class="messageGroup__avatar" style="background-image: url(.${_data.botSender.botSenderIconUrl}"></div>
        <div class="messageGroup__content">
          <div class="type__video">
            <img src="${_data.content.videoimg}" alt="">
          </div>
          <div class="type__time">
            <p>上午 23:59</p>
          </div>
        </div>
      </div>
    `
    );
  };

  const createImagemap = (_data, _role) => {
    wrap.insertAdjacentHTML('beforeend',
      `
      <div class="messageGroup__group messageGroup__group--full ${_role === 1 && "messageGroup__user"}">
        <div class="messageGroup__avatar" style="background-image: url(.${_data.botSender.botSenderIconUrl}"></div>
        <div class="messageGroup__content messageGroup__content--full">
          <div class="type__imagemap">
            <img src="${_data.content.imgUrl}" alt="">
          </div>
          <div class="type__time">
            <p>上午 23:59</p>
          </div>
        </div>
      </div>
    `
    );
  };

  const createImage = (_data, _role) => {
    wrap.insertAdjacentHTML('beforeend',
      `
      <div class="messageGroup__group ${_role === 1 && "messageGroup__user"}">
        <div class="messageGroup__avatar" style="background-image: url(.${_data.botSender.botSenderIconUrl}"></div>
        <div class="messageGroup__content">
          <div class="type__image">
            <img src="${_data.content}" alt="">
          </div>
          <div class="type__time">
            <p>上午 23:59</p>
          </div>
        </div>
      </div>
    `
    );
  };

  const createCarousel = (_data, _role, _index) => {
    wrap.insertAdjacentHTML('beforeend',
      `
      <div class="messageGroup__group messageGroup__group--full ${_role === 1 && "messageGroup__user"}">
        <div class="messageGroup__avatar" style="background-image: url(.${_data.botSender.botSenderIconUrl}"></div>
        <div class="messageGroup__content messageGroup__content--full">
        <div class="type__carousel t-${_index}">
          ${_data.content.slides.map((item) => `
            <div class="carousel__group">
              <div class="carousel__img">
                <img src="${item.imgUrl}" alt="">
              </div>
              <div class="carousel__text">
                <p class="title">${item.title}</p>
                <p class="desc">${item.desc}</p>
              </div>
              <div class="carousel__footer">
                ${item.buttons.map((b) => `
                  <a href="javascript:void(0)">${b.title}</a>
                `)}
              </div>
            </div>
          `)}
        </div>
          <div class="type__time">
            <p>上午 23:59</p>
          </div>
        </div>
      </div>
    `
    );
  };

  const createMessage = async (_data) => new Promise((resolve, reject) => {
    _data.forEach((group) => {
      group.msgInfo.forEach((item, index) => {
        switch (item.type) {
          case "text":
            createText(item, group.role);
            break;
          case "image":
            createImage(item, group.role);
            break;
          case "imagemap":
            createImagemap(item, group.role);
            break;
          case "video":
            createVideo(item, group.role);
            break;
          case "carousel":
            createCarousel(item, group.role, index);
            break;
          default:
            console.log("error");
            break;
        }
      });
    });
    resolve();
  });

  const carouselMove = () => {
    let pos1 = 0, pos2 = 0;
    let target;
    const group = document.querySelectorAll(".type__carousel");

    const leave = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const drag = (e) => {
      e = e || window.event;
      pos1 = pos2 - e.clientX;
      pos2 = e.clientX;
      target.scrollLeft += pos1;
    };

    const down = (e) => {
      e = e || window.event;
      pos2 = e.clientX;
      document.onmouseup = leave;
      document.onmousemove = drag;
    };

    group.forEach((item, index) => {
      item.onmousedown = down;
      item.addEventListener("mousedown", function() {
        target = item;
      });
    });
  };

  const create = async (_data) => {
    await createMessage(_data);
    carouselMove();
  };

  const getData = () => {
    fetch("./data.json")
      .then(res => {
        return res.json();
      }).then(result => {
        create(result);
      }).catch(function (err) {
        console.log(err);
      });
  };

  {
    getData();
  }
}();