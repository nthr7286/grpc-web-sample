FROM envoyproxy/envoy-dev:latest

ARG _SRC_DIR=client-react-service-envoy

ADD ${_SRC_DIR}/envoy.yaml /etc/envoy.yaml
RUN chmod go+r /etc/envoy.yaml

CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy.yaml"]